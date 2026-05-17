'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { getNotes } from '@/lib/api';
import css from './NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

interface NoteProps {
  tag?: string;
}

export default function NotesClient({tag}: NoteProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

 const handleSearch = useDebouncedCallback((nextSearchQuery: string) => {
  setSearchQuery(nextSearchQuery);
  setCurrentPage(1);
}, 300);
  
  const { data, isLoading, isError, error} = useQuery({
    queryKey: ['notes', searchQuery, currentPage, tag],
    queryFn: () => getNotes(searchQuery, currentPage, tag ),
    placeholderData: keepPreviousData,
  });
    
if (isError) {
  throw error;
}

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox defaultValue={searchQuery} onSearch={handleSearch}/>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <Link className={css.button} href="/notes/action/create">Create note +</Link>
        </header>
        {isLoading && <p>Loading...</p>}
        {notes.length !== 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
  
}