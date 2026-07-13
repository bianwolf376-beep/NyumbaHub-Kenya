import PropertyDetails from "@/features/landlord/properties/PropertyDetails";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PropertyDetails id={id} />;
}