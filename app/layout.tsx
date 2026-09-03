import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EiX Property Score™ Beta",
  description:
    "South Africa's first AI Property Concierge. Analyze any Property24 or Private Property listing in 24 hours.",
  icons: {
    icon: "/eix-favicon.svg",
    shortcut: "/eix-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA">
      <body>{children}</body>
    </html>
  );
}
