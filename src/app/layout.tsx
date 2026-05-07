import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Power Farming | Marketing Performance",
  description: "Marketing performance analytics dashboard for Power Farming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
