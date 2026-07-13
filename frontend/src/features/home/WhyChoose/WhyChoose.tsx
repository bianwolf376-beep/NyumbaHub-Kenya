import {
    Brain,
    ShieldCheck,
    MapPinned,
    BadgeCheck,
  } from "lucide-react";
  
  import FeatureCard from "./FeatureCard";
  
  export default function WhyChoose() {
    return (
      <section className="bg-slate-50 py-28 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
  
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold">
              Why Choose NyumbaHub?
            </h2>
  
            <p className="mx-auto mt-5 max-w-3xl text-lg text-muted-foreground">
              We combine artificial intelligence with verified property listings
              to make finding a home in Kenya easier, faster and safer.
            </p>
          </div>
  
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
  
            <FeatureCard
              icon={Brain}
              title="Ask Nyumba AI"
              description="Search naturally. Tell AI exactly what home you need."
            />
  
            <FeatureCard
              icon={ShieldCheck}
              title="Verified Listings"
              description="Every landlord and property goes through verification."
            />
  
            <FeatureCard
              icon={MapPinned}
              title="Location Smart"
              description="Search by county, estate, landmarks or nearby schools."
            />
  
            <FeatureCard
              icon={BadgeCheck}
              title="Trusted Platform"
              description="Helping tenants and landlords connect with confidence."
            />
  
          </div>
  
        </div>
      </section>
    );
  }