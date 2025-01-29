import type { Metadata } from "next"
import { Karla } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/navigation"

const karla = Karla({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vijay Lalwani",
  description: "Welcome to my part of internet",
  icons: {
    icon: [
      {
        url: "/dark.png",
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: "/light.png", 
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
} as const

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${karla.className} antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <div className="min-h-screen bg-evuam-50 dark:bg-black/50 p-4 md:py-12 md:px-8 lg:px-12 flex flex-col">
            <Navigation />
            <main className="max-w-3xl w-full mx-auto space-y-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

