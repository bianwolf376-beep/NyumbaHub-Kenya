import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          Welcome to NyumbaHub
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          Kenya's AI-powered property marketplace.
        </p>
      </main>
    </>
  );
}