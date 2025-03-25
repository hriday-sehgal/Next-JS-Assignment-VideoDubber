import type React from "react"
import "@mantine/core/styles.css"
import { MantineProvider, ColorSchemeScript } from "@mantine/core"
import { theme } from "@/theme"
import type { Metadata } from "next"
import "@/app/globals.css"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"

export const metadata: Metadata = {
  title: "Rebane's Discord Colored Text Generator",
  description: "Create colored Discord messages using ANSI color codes",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}



import './globals.css'