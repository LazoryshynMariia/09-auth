import { getNotes } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NoteProps {
    params: Promise<{ slug: string[]}>
}

export  const generateMetadata = async({ params }: NoteProps): Promise<Metadata> => {
    const { slug } = await params;
    const tag = slug[0];

    return {
        title: `${tag}`,
        description: `notes with the tag ${tag}`,
        openGraph: {
            title: `${tag}`,
            description: `notes with the tag ${tag}`,
            url: `https://09-auth-lyart-nine.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: "NoteHub",
                },
            ]
        },
    };
};

export default async function Notes({params}: NoteProps) {
    const queryClient = new QueryClient();

    const { slug } = await params;

    const tag = slug[0] === 'all' ? undefined : slug[0];

    await queryClient.prefetchQuery({
    queryKey: ['notes',tag],
    queryFn:() => getNotes(tag),
  })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag}/>
        </HydrationBoundary>
    );
};