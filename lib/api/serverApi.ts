import { Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";

// getMe
// checkSession.


export interface NotesResponse { 
    notes: Note[];
    totalPages: number;
};


export const getNotes = async (searchText?: string, page: number = 1, tag?: string ) => {
    const res = await nextServer.get<NotesResponse>("/notes", {
        params: {
            page,
            perPage: 12,
            search: searchText,
            tag: tag,
        }
    });
    return res.data;
};

export const fetchNoteById = async (id: string) => {
     const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    
    return res.data;
};
 
export const checkServerSession = async () => {
    const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async () => {
       const cookieStore = await cookies();
   const { data } = await nextServer.get("/users/me", {
      headers: {
         Cookie: cookieStore.toString(),
      },
   });
   return data;
};