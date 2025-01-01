import { Folder } from '@prisma/client';
import { Frown } from 'lucide-react';

import { FolderCard } from './folder-card';

type FolderListProps = {
  folders: Folder[];
};

export const FolderList = ({ folders }: FolderListProps) => {
  if (folders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 px-[10%] text-center">
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {folders.map(folder => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
};
