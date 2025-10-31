import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Georgia Grant Letter Generator',
  description: 'Professional grant application letter generator for Georgia residents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
