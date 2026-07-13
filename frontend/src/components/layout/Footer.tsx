'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">NyumbaHub</h3>
          <p className="text-slate-400 text-sm">
            The most trusted property marketplace in Kenya, connecting renters and landlords.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-slate-400 hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/properties" className="text-slate-400 hover:text-white transition">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-400 hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-slate-400 hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 hover:text-white transition">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 hover:text-white transition">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 hover:text-white transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-slate-400">
              <Phone className="h-4 w-4 mr-2" />
              <a href="tel:+254712345678" className="hover:text-white transition">
                +254 712 345 678
              </a>
            </div>
            <div className="flex items-center text-slate-400">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:info@nyumbahub.com" className="hover:text-white transition">
                info@nyumbahub.com
              </a>
            </div>
            <div className="flex items-center text-slate-400">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2026 NyumbaHub Kenya. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
