import autoAnimate from '@formkit/auto-animate';
import { Frown, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { FolderWithNoteCount } from '@/types/folder';

import { FolderCard } from './folder-card';

type FolderListProps = {
  folders: FolderWithNoteCount[];
  isLoading: boolean;
  error?: string;
};

export const FolderList = ({ folders, isLoading, error }: FolderListProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  if (isLoading) {
    return (
      <div
        ref={parentRef}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Loader2 className="h-6 w-6 animate-spin" />
        <p>Ładowanie folderów...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        ref={parentRef}
        className="flex flex-col items-center gap-4 text-center text-red-500"
      >
        <Frown className="h-6 w-6" />
        <p>{error}</p>
      </div>
    );
  }

  if (folders.length === 0) {
    return (
      <div
        ref={parentRef}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Frown className="h-12 w-12" />
        <div className="flex flex-col gap-2">
          <h1 className="md:text-xl">
            Wygląda na to, że nie masz jeszcze żadnych folderów
          </h1>
          <p className="text-sm text-foreground">
            Dodaj nowy folder, aby móc przechowywać swoje pliki
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {folders.map(folder => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
};
