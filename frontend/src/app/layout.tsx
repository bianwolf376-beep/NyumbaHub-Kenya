import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import './globals.css';

import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/providers/AuthProvider';

import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nyumbahub.co.ke'),
  title: {
    default: 'NyumbaHub Kenya',
    template: '%s | NyumbaHub Kenya',
  },
  description:
    'Find houses, apartments and rental homes across Kenya with the help of AI.',
  keywords: [
    'Kenya Houses',
    'Apartments',
    'NyumbaHub',
    'Rent',
    'Real Estate',
    'AI Property Search',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        'font-sans',
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground"
      >
        <ThemeProvider>
          <AuthProvider>
            <Navbar />

            {children}

            <Toaster
              richColors
              position="top-right"
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}