import { fetchNoteById } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NotePreview.client";

type Props = {
    params: Promise<{id:string}>
}

export default async function NoteDetails({ params }: Props) {

    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
        </HydrationBoundary>
  );
}