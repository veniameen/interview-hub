import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { AppProvider } from './_providers'
import './globals.css'

const sbtSansDisplayThin = localFont({
  src: '../../public/fonts/SBSansDisplay-Thin.woff2',
  variable: '--font-sbt-sans-display',
  weight: '100',
})
const sbtSansDisplayLight = localFont({
  src: '../../public/fonts/SBSansDisplay-Light.woff2',
  variable: '--font-sbt-sans-display',
  weight: '300',
})
const sbtSansDisplayRegular = localFont({
  src: '../../public/fonts/SBSansDisplay-Regular.woff2',
  variable: '--font-sbt-sans-display',
  weight: '400',
})
const sbtSansDisplaySemiBold = localFont({
  src: '../../public/fonts/SBSansDisplay-SemiBold.woff2',
  variable: '--font-sbt-sans-display',
  weight: '600',
})
const sbtSansDisplayBold = localFont({
  src: '../../public/fonts/SBSansDisplay-Bold.woff2',
  variable: '--font-geist-mono',
  weight: '700',
})

export const metadata: Metadata = {
  title: 'Сервис проведения собеседований',
  description: 'Сервис проведения собеседований',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${sbtSansDisplayThin.variable} ${sbtSansDisplayLight.variable} ${sbtSansDisplayRegular.variable} ${sbtSansDisplaySemiBold.variable} ${sbtSansDisplayBold.variable} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
