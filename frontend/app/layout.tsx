import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from './components/nav-bar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Let You Cook",
  description: "A web application that eliminates (part of) the decision fatigue associated with making dinner (hopefully)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <div className='h-max flex-initial'>
          <NavBar />
        </div>
        <div className='flex-1'>
          {children}
        </div>
      </body>
    </html>
  );
}
