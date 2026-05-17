import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/serverApi";

interface Props {
    params: Promise<{id:string}>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `${note.title}`,
    description: `It's your note ${note.title}`,
    openGraph: {
    title: `${note.title}`,
    description: `It's your note ${note.title}`,
    url: `https://08-zustand-eey9cajz8-lazoryshynmariias-projects.vercel.app/notes/${note.id}`,
    images: [
      {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
    ]
  },
  }
};

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