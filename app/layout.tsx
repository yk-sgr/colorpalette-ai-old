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
        <script defer data-domain="colorpalette-ai.com"
                src="https://analytics.colorpalette-ai.com/js/script.js"></script>
        {/*<script
          type="text/javascript"
          src="https://app.termly.io/embed.min.js"
          data-auto-block="on"
          data-website-uuid="87ba0d72-cf08-4d12-b3a6-5dccade79cfa"
        ></script>*/}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="shortcut icon" href="/favicon/favicon.ico"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
        <meta name="theme-color" content="#ffffff"/>
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
            <SiteFooter/>
          </div>
          <TailwindIndicator/>
        </ThemeProvider>
        </body>
      </ClientProviders>
      </html>
    </>
  )
}
