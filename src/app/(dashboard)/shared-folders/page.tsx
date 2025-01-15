'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

import { FolderList } from '@/components/Folders/folders-list';
import { Button } from '@/components/ui/button';
import { useFolders } from '@/hooks/use-folders';

function SharedFoldersPage() {
  const { folders, isLoading, error, loadFolders } = useFolders(
    '/api/folders/shared/all',
  );

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  return (
    <div className="flex flex-col justify-center gap-8 py-4">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h1 className="text-xl font-bold md:text-2xl">Udostępnione foldery</h1>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={loadFolders}>
            Odśwież
            <RefreshCw />
          </Button>
        </div>
      </div>
      <FolderList
        folders={folders}
        isLoading={isLoading}
        error={error}
        areFoldersEditable={false}
      />
    </div>
  );
}

export default SharedFoldersPage;
