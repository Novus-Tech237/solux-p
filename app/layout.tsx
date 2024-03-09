"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { Toaster } from '@/components/ui/toaster'
import SplashScreen from '@/components/Splashscreen'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({children,}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) {
      return
    }
  }, [isLoading])
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/logo.png" />
        <title>Solux | IT E-Learning Platform</title>
      <body className={inter.className}>
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)}/>
        ) : (
          <>
            <ConfettiProvider />
            <ToastProvider/>
            {children}
            <Toaster />
          </>
        )}
        </body>
    </html>
    </ClerkProvider>
    
  )
}
