import PropertyGrid from "@/features/home/PropertyGrid";

interface Props {
  searchParams: Promise<{
    county?: string;
    town?: string;
    estate?: string;
    propertyType?: string;
    bedrooms?: string;
    bathrooms?: string;
    minRent?: string;
    maxRent?: string;
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <PropertyGrid
        filters={{
          county: params.county,
          town: params.town,
          estate: params.estate,
          propertyType: params.propertyType,
          bedrooms: params.bedrooms
            ? Number(params.bedrooms)
            : undefined,
          bathrooms: params.bathrooms
            ? Number(params.bathrooms)
            : undefined,
          minRent: params.minRent
            ? Number(params.minRent)
            : undefined,
          maxRent: params.maxRent
            ? Number(params.maxRent)
            : undefined,
        }}
      />
    </main>
  );
}