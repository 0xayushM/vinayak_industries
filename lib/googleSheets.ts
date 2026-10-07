import { google } from 'googleapis';

/**
 * Rows are written as USER_ENTERED, so a cell starting with = + - or @ would run as a formula.
 * Visitor-supplied text gets a leading apostrophe instead, which Sheets shows as plain text.
 */
function asPlainText(cell: string) {
  return /^[=+\-@\t\r]/.test(cell) ? `'${cell}` : cell;
}

export async function appendToSheet(rows: string[][], sheetRange: string = 'Sheet1!A:G') {
  const values = rows.map((row) => row.map((cell) => (typeof cell === 'string' ? asPlainText(cell) : cell)));
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    throw error;
  }
}

export async function appendVisitorTracking(values: string[][]) {
  return appendToSheet(values, 'Visitor Tracking!A:V');
}
