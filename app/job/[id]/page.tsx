import { redirect } from "next/navigation";

export default async function SingleJobRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/hotspot/${id}`);
}
