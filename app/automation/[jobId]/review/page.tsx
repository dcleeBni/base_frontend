import { redirect } from "next/navigation";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  redirect(`/automation/${jobId}/ui-review`);
}
