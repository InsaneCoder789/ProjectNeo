import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'INSPECTOR GREP // TERMINAL',
  description: 'An interactive tactical terminal interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
