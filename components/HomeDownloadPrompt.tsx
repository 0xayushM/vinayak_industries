'use client';

import DownloadDialog from "@/components/DownloadDialog";
import { useState, useEffect } from "react";

/** Offers the company profile download five seconds into a visitor's first home-page view of the session. */
export default function HomeDownloadPrompt() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenDownloadPopup');

    if (!hasSeenPopup && !hasShownPopup) {
      const timer = setTimeout(() => {
        setIsDialogOpen(true);
        setHasShownPopup(true);
        sessionStorage.setItem('hasSeenDownloadPopup', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasShownPopup]);

  return <DownloadDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />;
}
