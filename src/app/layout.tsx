import './globals.css';
import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';
import Head from 'next/head';

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
      <Head>
        <meta name="google-site-verification" content="i9Zx5VYNj30sm2FIOD-0PHHcQrxQRRjeVM6l-slOMsk" />
      </Head>
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body>{children}</body>
      </PHProvider>
    </html>
  )
}
