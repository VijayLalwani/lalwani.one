import type { Metadata } from "next"
import { Karla, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Navigation } from "@/components/navigation"

const karla = Karla({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-karla',
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist-mono',
});

const departureMono = localFont({
  src: "../assets/fonts/DepartureMono-Regular.woff2",
  display: "swap",
  variable: "--font-departure-mono",
});


export const metadata: Metadata = {
  title: "Vijay Lalwani",
  description: "Welcome to my part of internet",
  icons: {
    icon: [
      { url: "/dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/light.png", media: "(prefers-color-scheme: light)" },
    ],
  },
} as const

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${karla.variable} ${geistMono.variable} ${departureMono.variable}`}>
      <body className="antialiased bg-white text-gray-900 dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen p-4 md:py-12 md:px-8 lg:px-12 flex flex-col">
            <Navigation />
            <main className="max-w-3xl w-full mx-auto space-y-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}