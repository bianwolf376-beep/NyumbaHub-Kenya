import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold text-sky-400">
              NyumbaHub
            </h3>

            <p className="mt-4 text-slate-400">
              Kenya&apos;s AI-powered property marketplace.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Company</h4>

            <div className="space-y-3">
              <Link href="#">About</Link>
              <br />
              <Link href="#">Contact</Link>
              <br />
              <Link href="#">Careers</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Property</h4>

            <div className="space-y-3">
              <Link href="#">Rent</Link>
              <br />
              <Link href="#">Buy</Link>
              <br />
              <Link href="#">Landlords</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>

            <div className="space-y-3">
              <Link href="#">Privacy</Link>
              <br />
              <Link href="#">Terms</Link>
              <br />
              <Link href="#">Cookies</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500">
          © {new Date().getFullYear()} NyumbaHub Kenya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}