'use client';

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (isError) {
      throw error;
    };

    if (!note) {
        return <p>Something went wrong.</p>;
    }

    const handleGoBack = () => {
            router.back();
     };
    
    return (
        <div className={css.container}>
            <div className={css.item}>
                <button className={css.backBtn} onClick={handleGoBack}>
                    Back
                </button>
                <div className={css.header}>
                    <h2>{note?.title }</h2>
                </div>
                <p className={css.tag}>{note?.tag}</p>
                <p className={css.content}>{note?.content}</p>
                <p className={css.date}>{note?.createdAt}</p>
            </div>
        </div>
    );
}