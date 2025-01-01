'use client';

import { Folder } from '@prisma/client';
import { useEffect, useState } from 'react';

import { FolderList } from '@/components/Folders/folders-list';
import { NewFolderDialog } from '@/components/Folders/new-folder-dialog';

function OwnedFoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetch('/api/folders/owned')
      .then(response => response.json())
      .then(data => setFolders(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddFolder = async (name: string) => {
    const response = await fetch('/api/folders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const newFolder = await response.json();
      setFolders(previous => [...previous, newFolder]);
    } else {
      console.error('Błąd podczas dodawania folderu');
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">Moje foldery</h1>
        <NewFolderDialog onAddFolder={handleAddFolder} />
      </div>
      <FolderList folders={folders} />
    </div>
  );
}

export default OwnedFoldersPage;

// Todo: Handle bad requests and other errors at API communication
