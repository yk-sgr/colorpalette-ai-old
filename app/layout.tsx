import "@/styles/globals.css"
import {Metadata} from "next"

import {siteConfig} from "@/config/site"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import {SiteHeader} from "@/components/site-header"
import {TailwindIndicator} from "@/components/tailwind-indicator"
import {ThemeProvider} from "@/components/theme-provider"
import {ClerkProvider} from "@clerk/nextjs/app-beta";
import React, {PropsWithChildren} from 'react';
import {ClientProviders} from '@/app/client-provider';
import SiteFooter from '@/components/site-footer';
import PlausibleProvider from 'next-plausible';
import * as process from 'process';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

type RootLayoutProps = PropsWithChildren;

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head>
        <script defer data-domain="colorpalette-ai.com" src="https://analytics.colorpalette-ai.com/js/script.js"></script>
      </head>
      <ClientProviders>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader/>
              <div className="mt-8 flex-1">{children}</div>
              <SiteFooter />
            </div>
            <TailwindIndicator/>
          </ThemeProvider>
          </body>
      </ClientProviders>
      </html>
    </>
  )
}
