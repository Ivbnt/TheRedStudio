import type { Metadata } from "next";
import "./styles/index.css";

export const metadata: Metadata = {
  title: "The Red Studio",
  description: "Recording studio for artists",
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
