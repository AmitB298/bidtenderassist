import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "BidTenderAssist — India's Fastest Tender Discovery Platform",
  description: 'Find government tenders from CPPP, GeM, state portals in one place.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
