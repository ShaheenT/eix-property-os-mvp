import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "EiX Property Score™ | Property intelligence", description: "Decision-ready property scoring for agents, brokers, investors and owners." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
