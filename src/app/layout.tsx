import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heritage Farms - Cultivating Heritage Crops in Ontario",
  description: "Ontario's first Black-led farm focusing on year-round West African and Caribbean greens using sustainable greenhouse, hydroponic, and pasture systems.",
  keywords: "heritage crops, African produce, Caribbean greens, sustainable farming, Ontario farm, local produce",
  authors: [{ name: "Heritage Fields and Acreage Ltd" }],
  openGraph: {
    title: "Heritage Farms - Cultivating Heritage Crops in Ontario",
    description: "Fresh, culturally meaningful produce grown locally in Ontario",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heritage Farms - Cultivating Heritage Crops in Ontario",
    description: "Fresh, culturally meaningful produce grown locally in Ontario",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/branding/Images/favicon.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 