import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Nunito} from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirGear',
  description: 'Gear rental and listings',
}

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
