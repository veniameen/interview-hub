'use client'
import type { PropsWithChildren } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'
import { SessionProvider } from 'next-auth/react'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  )
}
