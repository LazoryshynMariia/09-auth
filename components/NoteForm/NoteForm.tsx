'use client'

import css from "./NoteForm.module.css";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote, NewNote } from '@/lib/api/clientApi';
import { useRouter } from "next/navigation";
import { Tags } from "@/types/note";;


interface NoteFormProps {
    tags: Tags[];
}

export default function NoteForm({ tags }: NoteFormProps) {
    const router = useRouter();
    const fieldId = useId();
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

     const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            router.push('/notes/filter/all')
        }
    });

   

    const handleCancel = () => {
        router.push('/notes/filter/all')
    };

    const handleSubmit = (formData: FormData) => {
        const values: NewNote = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            tag: formData.get("tag") as string,
        }
    mutation.mutate(values);
  };

    return (
        <form className={css.form} action={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    id={`${fieldId}-title`}
                    type="text" name="title"
                    className={css.input}
                    minLength={3}
                    maxLength={50}
                    defaultValue={draft.title}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    maxLength={500}
                    defaultValue={draft.content}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select
                    id={`${fieldId}-tag`} name="tag"
                    className={css.select}
                    required
                    defaultValue={draft?.tag}
                    onChange={handleChange}
                >
                    {tags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Creating...' : 'Create note'}
                </button>
            </div>
        </form>
           
    );
}