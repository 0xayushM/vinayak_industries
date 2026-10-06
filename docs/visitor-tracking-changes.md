# Visitor tracking and lead capture: changes

**Site:** vinayaktechnoplast.com · **Branch:** `fix/visitor-tracking` (not committed or pushed yet) · **Date:** 5 Oct 2026

## Summary

The 25 Sep audit showed that 52% of the Visitor Tracking sheet was noise, that the sheet only recorded the first page of each visit, and that the tracker had several data bugs. While making the fixes, two bigger problems turned up in the lead forms:

1. **Moulding project inquiries never reached the sheet.** The "Discuss Your Mould Project" dialog on /moulding sent only to BrewMyAgent, so it was invisible in `Sheet1`.
2. **Any BrewMyAgent outage lost the lead completely.** The contact form and the deck download sent to BrewMyAgent first. If that call failed, the visitor saw an error and the sheet write never ran. This may explain the Pitampura visitor who opened /contact 8 times on 5 Sep without a single submission.

Both are fixed. The build passes (`next build`, all 17 routes), TypeScript is clean, and the filters were tested against a running server.

## What was done

### 1. Tracker now records every page, not just the landing page
- `hooks/useVisitorTracking.ts` re-runs on every route change (`usePathname`). Before, it ran once per full page load, so menu navigation to /contact, /moulding and so on was never logged.
- Each hit carries a **session ID**, so a visit can be followed page by page.

### 2. Referrer and campaign data are real
- The real external referrer (`document.referrer`) is sent from the browser. Before, the server logged its own page URL, which is why 96% of referrers were useless.
- **UTM source, medium and campaign** are captured and kept for the whole session (first touch). ChatGPT referrals (`utm_source=chatgpt.com`) now show up in their own column.

### 3. Bots, crawlers and dev traffic are dropped before they reach the sheet
- `app/api/track-visitor/route.ts` drops known bot and automation user agents (Googlebot, headless Chrome, Lighthouse, Vercel screenshots, curl, Python, link previews and others), empty user agents, and any hit from `localhost` or `*.vercel.app` previews.
- The browser also skips automated browsers (`navigator.webdriver`).

### 4. Location comes from the server, not ipapi.co
- Country, city, region and timezone now come from Vercel's edge headers. This is free, can't be blocked by ad blockers, and never rate-limits. Before, 164+ rows had no location because the browser's ipapi.co call failed.
- **Latitude and longitude are no longer stored** (data minimisation).

### 5. OS, browser and device detection fixed
- Detection moved to the server. Android was being labelled "Linux" and iPhones "macOS", which is why the old sheet showed 444 Linux and 0 iOS. Edge, Opera and Samsung Internet are now recognised.

### 6. Conversion events tracked
| Event | When it fires |
|---|---|
| `page_view` | every page, including in-site navigation |
| `generate_lead` | contact form, mould inquiry or deck form saved |
| `deck_download` | company profile PDF downloaded |
| `whatsapp_click` | any wa.me link, including the floating button |
| `phone_click` / `email_click` | any tel: or mailto: link |

Every event goes to the sheet (`Event` column) **and** to `window.dataLayer`, so Google Tag Manager can turn it into GA4, Google Ads or LinkedIn conversions with no further code changes.

### 7. Lead forms can't lose leads any more
- New helper `submitLead()` in `lib/tracking.ts` sends each lead to the **sheet and BrewMyAgent in parallel**. If either one accepts it, the visitor sees success and the failure is logged.
- **Contact form** (`app/contact/page.tsx`), **deck download** (`components/DownloadDialog.tsx`) and **mould inquiry** (`components/MouldingInquiryDialog.tsx`) all use it.
- Mould inquiries now land in `Sheet1`, with a new **Source** column (`contact_form` / `moulding_inquiry`).
- Phone numbers are saved as text, so they stop turning into `9.31139699E9`.
- Debug `console.log`s that printed BrewMyAgent environment variables in the browser were removed.

### 8. Consent banner, Consent Mode and a slot for GTM
- New `components/ConsentAndTags.tsx` shows a cookie banner. The choice is remembered. (Buttons changed to **Decline** / **Accept** on 6 Oct.)
- **Apollo, RB2B and Microsoft Clarity now load only after the visitor accepts.** Before, they ran for every visitor with no notice.
- **Google Consent Mode v2** defaults to denied and switches to granted when the visitor accepts.
- **Google Tag Manager** loads automatically once `NEXT_PUBLIC_GTM_ID` is set in Vercel. Until then nothing loads.
- Without consent, the first-party tracker stores a **masked IP** (last block zeroed, e.g. `49.36.139.0`). With consent it stores the full IP.

### 9. Privacy policy
- New page at **/privacy**, linked from the banner and the footer. The footer year also updates itself now instead of saying 2025. (Rewritten as a general policy on 6 Oct; see the update below.)

### 10. Live sheet headers corrected
- **Visitor Tracking** row 1 was mislabelled from "Region" onward ("Hardware", "Code"…). It now reads, in order: Timestamp, IP Address, User Agent, Referrer, Page URL, Country, City, Region, Latitude (old rows only), Longitude (old rows only), Timezone, Browser, OS, Device Type, Resolution, Language, then the new columns **Session ID, Event, UTM Source, UTM Medium, UTM Campaign, Path**.
- **Sheet1** got a **Source** header in column H.
- Old rows keep their positions, so existing data stays aligned under the right headers.

## Before and after

| | Before | After |
|---|---|---|
| Pages recorded per visit | first page only | every page, with session ID |
| Referrer | own page URL (96%) | real external referrer + UTMs |
| Bot / dev rows | ~43% of sheet | dropped at write time |
| Rows with no location | 164+ (ipapi.co failures) | none expected (Vercel headers) |
| OS accuracy | Android → Linux, iOS → macOS | correct |
| Mould inquiries in sheet | never | yes, Source = moulding_inquiry |
| Lead lost if BrewMyAgent is down | yes, and visitor sees an error | no, saved to sheet, visitor sees success |
| WhatsApp / phone / email clicks | invisible | tracked as events |
| Third-party trackers | run for everyone, no notice | only after consent |
| Lat/long + full IP stored | always | lat/long never, full IP only with consent |
| Phone format in sheet | float (9.31E9) | text |
| Ready for GTM / GA4 / LinkedIn | no | yes, add the GTM ID |

## Files changed

- `lib/tracking.ts` (new): session ID, UTMs, consent state, `trackEvent()`, `submitLead()`
- `components/ConsentAndTags.tsx` (new): banner, consent-gated Apollo / RB2B / Clarity
- `app/privacy/page.tsx` (new): general privacy policy
- `components/CookieSettingsButton.tsx` (new): reopens the cookie banner
- `app/api/track-visitor/route.ts`: bot / dev filter, Vercel geo, UA parsing, IP masking, new columns, BrewMyAgent page-view forward moved to the server
- `hooks/useVisitorTracking.ts`: page view on every route change
- `components/VisitorTracker.tsx`: WhatsApp / phone / email click tracking
- `app/api/contact/route.ts`: Source column, mould inquiries accepted, phone as text
- `app/api/subscribe/route.ts`: phone as text
- `app/contact/page.tsx`, `components/DownloadDialog.tsx`, `components/MouldingInquiryDialog.tsx`: use `submitLead()`
- `app/layout.tsx`: Consent Mode default, optional GTM, inline trackers removed
- `components/Footer.tsx`: privacy link, dynamic year
- `lib/googleSheets.ts`: Visitor Tracking range A:R → A:V

## To ship it

1. Review the diff: `git diff main` on branch `fix/visitor-tracking`.
2. Commit, push and let Vercel build a preview. Preview hits are deliberately not logged, so check the preview by watching the browser Network tab for `/api/track-visitor` returning 204.
3. Merge to main. After the deploy, browse 3–4 pages on the live site, then confirm new rows appear with the Session ID, Event and Path columns filled.
4. Submit one test inquiry from /moulding and check that it appears in Sheet1 with Source = moulding_inquiry. Delete the test row afterwards.

## Update · 6 Oct 2026

### Privacy policy and cookie choice
- **/privacy rewritten as a general privacy policy.** It no longer names specific tools, retention periods or storage details. It covers: information collected, how it's used, cookies, sharing, security and retention, your rights, changes, and contact details.
- **The cookie banner now has two equal buttons: Decline and Accept.** Decline keeps optional cookies off. Only essential site functions run.
- **The choice can be changed at any time** with the new **Cookie settings** link in the footer and on the privacy page. It reopens the banner. Switching from Accept to Decline reloads the page so already-loaded optional scripts stop.

### Contact page: why visitors left without submitting, and what changed
Likely reasons, in order:
1. **The form errored whenever BrewMyAgent was down**, and the lead was lost. This was fixed on 5 Oct. The visitor who opened /contact 8 times on 5 Sep fits this pattern: they tried, saw an error, and reloaded. They were on Airtel broadband in Pitampura, a few km from the Nangloi office, so it may also have been someone from the team testing.
2. **A blank "Message" box.** It's the hardest field, and there was no hint about what a quote request needs.
3. **Too much typing for a first contact.** There were five required fields, including email *and* phone, and a free-text country field.
4. **No reason to trust or hurry.** There was nothing about response time, certifications or confidentiality next to the button.
5. **No low-effort alternative on the form itself.** Many Indian B2B buyers would rather WhatsApp than fill a form.
6. A small bug: the second phone number (+91 9999394814) dialled the first number.

Changes made in `app/contact/page.tsx`:
- **One-tap "What do you need?" chips** (Quote for a part, New mould development, Samples / prototype, Something else). The message box placeholder changes to a worked example for each, e.g. *"Polyamide connector housing, approx. 25 g, black…"*.
- **A hint under the message box:** material, size or weight, quantity, timeline, and whether a drawing is available.
- **Optional quantity chips** (Not sure yet → Over 5 lakh), so the visitor can give scale without typing.
- **Less friction:** email is now optional (phone/WhatsApp stays required), country is prefilled as India for Indian visitors, and fields have autofill hints so phones fill name, phone and email in one tap.
- **Expectation and trust:** "Takes under a minute · replies within one working day", plus ISO 9001:2015, in-house tool room and confidentiality next to the button. The button text is now "Get my quote".
- **"Prefer WhatsApp? Chat with our sales team"** button directly under the form.
- **New tracking events:** `form_start` (first interaction) and `form_abandon` (left without sending). The abandon event records *which* fields were filled, never their contents, in the Path column, e.g. `/contact [filled: message,name]`. This shows exactly where people drop off.
- The sheet message now begins with the inquiry type and quantity, e.g. `[Quote for a part · Qty: 5,000 – 50,000] …`.

**Confirm before going live:** the "replies within one working day" promise. Change the text in two places in `app/contact/page.tsx` if sales can't commit to it.

## What can still be improved

### Needs a decision or an account (not code)
- **Create a GTM container and add `NEXT_PUBLIC_GTM_ID` in Vercel.** In GTM, add GA4, the Google Ads tag and the LinkedIn Insight Tag, and map the dataLayer events (`generate_lead`, `deck_download`, `whatsapp_click`) to conversions.
- **Decide whether gating Apollo and RB2B behind consent is acceptable.** It's the safer choice under DPDP, but it will reduce Apollo company matches. If the business wants them always on, move `loadMarketingTags()` out of the consent check in `ConsentAndTags.tsx`.
- **Consider dropping RB2B.** It only identifies US visitors (about 12% of real traffic) and is the hardest tool to justify on privacy grounds.
- **Have the privacy policy reviewed** before relying on it for DPDP compliance.

### Next code improvements
- **Retention job.** Add a scheduled clean-up that deletes old Visitor Tracking rows (e.g. after 12 months).
- **Lead alerts.** Send an email or WhatsApp alert to sales the moment a lead is saved. Today someone has to remember to check the sheet, which is how the Banner Engineering inquiry sat since June.
- **"Send drawing / RFQ" form** with file upload on /moulding, /product-line and /ev. A short form tied to a specific product is likely to convert better than the generic contact page.
- **Move tracking off Google Sheets** when it grows (e.g. Supabase or BigQuery). Sheets slows down past ~100k rows, and the append API has rate limits.
- **Cloud-crawler filtering by network.** The user-agent filter catches declared bots. Azure and AWS crawlers that pretend to be Chrome still get through and would need an ASN or IP-range check (Vercel's firewall bot rules can do this).
- **Drawing upload on the contact form.** Most buyers have a drawing or STEP file. Accepting it on the form needs file storage (e.g. Vercel Blob or Google Drive), since the sheet can't hold files.
- **Re-run the visitor report** after 4 weeks of clean data to get real funnel numbers (landing → product page → contact → submit) and WhatsApp click volume.
- Set `metadataBase` in `app/layout.tsx` (a build warning; affects social share images).
