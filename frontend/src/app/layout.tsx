'use client';

import React, { Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster position="top-center" />
              </div>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
