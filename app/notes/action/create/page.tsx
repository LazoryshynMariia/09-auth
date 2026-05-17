import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { tags } from "@/types/note";
import { Metadata } from "next";

const baseUrl =
  process.env.OG_URL ??
  "https://08-zustand-eey9cajz8-lazoryshynmariias-projects.vercel.app";

export const metadata: Metadata = {
    title: "Create note",
    description: "Create new notes on this page",
    
    openGraph: {
    title: "Create note",
    description: "Create new notes on this page",
    url: `${baseUrl}/notes/action/create`,
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

export default function CreateNote() {
    return(
        <>
            <main className={css.main}>
                <div className={css.container}>
                    <h1 className={css.title}>Create note</h1>
                    <NoteForm tags={tags}/>
                </div>
            </main>
        </>
    );
};