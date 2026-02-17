import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "The Red Studio",
  description: "Recording studio for artists",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "The Red Studio",
    description: "Recording studio for artists",
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "The Red Studio",
    description: "Recording studio for artists",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
