import './globals.css'
import '@radix-ui/themes/styles.css'
import type {Metadata} from 'next'
import {Theme} from '@radix-ui/themes'
import {Toaster} from 'react-hot-toast'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Capstone project - Project management application',
  description: 'Capstone project - Project management application - Ellis Callaghan',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <Theme appearance="dark" accentColor="green">
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  )
}
