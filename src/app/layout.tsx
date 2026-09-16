import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SimpleMagics — Career Counseling, Assessments & Roadmaps',
  description: 'Discover your true career fit through intelligent profiling, domain-specific assessments, and free expert counseling.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="font-body bg-surface-950 text-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#18191a',
              color: '#fff',
              border: '1px solid rgba(0,75,127,0.35)',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
      </body>
    </html>
  )
}
