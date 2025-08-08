import type { Metadata } from "next"
import { Karla, Sixtyfour, Source_Code_Pro } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Navigation } from "@/components/navigation"

const karla = Karla({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-karla',
});

const sixtyfour = Sixtyfour({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-sixtyfour-mono",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: "400", 
  display: "swap",
  variable: "--font-source-code-mono",
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
    <html lang="en" suppressHydrationWarning className={`${karla.variable}  ${sixtyfour.variable} ${sourceCodePro.variable}`}>
      <body className="antialiased transition-colors duration-300">
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