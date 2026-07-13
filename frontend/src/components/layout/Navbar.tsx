'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          🏠 NyumbaHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/properties" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition">
            Properties
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition">
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-slate-700 dark:text-slate-300">{user?.fullName}</span>
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-slate-900 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-slate-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-slate-700 dark:text-slate-300 hover:text-blue-600">
              Home
            </Link>
            <Link href="/properties" className="block text-slate-700 dark:text-slate-300 hover:text-blue-600">
              Properties
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="block text-slate-700 dark:text-slate-300 hover:text-blue-600">
                Dashboard
              </Link>
            )}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{user?.fullName}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
