'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

import { FolderList } from '@/components/Folders/folders-list';
import { NewFolderDialog } from '@/components/Folders/NewFolderDialog/new-folder-dialog';
import { Button } from '@/components/ui/button';
import { useFolders } from '@/hooks/use-folders';

function OwnedFoldersPage() {
  const { folders, isLoading, error, loadFolders, addFolder } = useFolders(
    '/api/folders/owned',
    true,
  );

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  return (
    <div className="flex flex-col justify-center gap-8 py-4">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h1 className="text-xl font-bold md:text-2xl">Moje foldery</h1>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={loadFolders}>
            Odśwież
            <RefreshCw />
          </Button>
          <NewFolderDialog addFolderHandler={addFolder} />
        </div>
      </div>
      <FolderList
        folders={folders}
        isLoading={isLoading}
        error={error}
        areFoldersEditable
        loadFolders={loadFolders}
      />
    </div>
  );
}

export default OwnedFoldersPage;
