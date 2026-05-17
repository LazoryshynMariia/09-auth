import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

// updateMe

export interface NewNote {
  title: string,
  content: string,
  tag: string,
};

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


export const createNote = async (data: NewNote) => {
    const res = await nextServer.post<Note>("/notes", data);
    return res.data;
};

export const fetchNoteById = async (id: string) => {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    
    return res.data;
 };

export const deleteNote = async (id: string) => {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
    const res = await nextServer.post<User>('/auth/register', data);

    return res.data;
};


export type LoginRequest = {
  email: string;
  password: string;
};


export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);

  return res.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
};

export type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async () => {
    const res = await nextServer<CheckSessionRequest>('/auth/session');

    return res.data.success;
};

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>('/users/me');

    return data;
};

export type UpdateUserRequest = {
   username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
   const res = await nextServer.patch<User>("/users/me", payload);
   return res.data;
};