import EditPropertyForm from "@/features/landlord/properties/EditPropertyForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({
  params,
}: Props) {
  const { id } = await params;

  return <EditPropertyForm id={id} />;
}