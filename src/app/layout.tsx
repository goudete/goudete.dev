import './globals.css';
import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';

import { PHProvider, PostHogPageview } from './providers';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enrique Goudet',
  description: 'goudet.dev',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body>{children}</body>
      </PHProvider>
    </html>
  )
}
