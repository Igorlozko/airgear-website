import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Nunito} from "next/font/google";
import Navbar from './componenets/navbar/Navbar';
import ClientOnly from './componenets/ClientOnly';
import RegisterModal from './componenets/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './componenets/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './componenets/modals/RentModal';
import SearchModal from './componenets/modals/SearchModal';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TheGearRepo',
  description: 'Gear rental and listings',
}

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <LoginModal/>
          <RentModal/>
          <RegisterModal/>
          <Navbar currentUser ={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
