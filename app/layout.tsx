import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Nunito} from "next/font/google";
import Navbar from './componenets/navbar/Navbar';
import ClientOnly from './componenets/ClientOnly';
import Modal from './componenets/modals/Modal';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TheGearRepo',
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
      <body className={font.className}>
        <ClientOnly>
          <Modal title="Log In" isOpen/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
