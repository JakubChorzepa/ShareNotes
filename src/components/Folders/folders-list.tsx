import autoAnimate from '@formkit/auto-animate';
import { Frown, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FolderWithNoteCount } from '@/types/folder';
import { TruncatedUserData } from '@/types/user';

import { FolderCard } from './folder-card';
import { ShareFolderModal } from './ShareFolderModal/share-folder-dialog';

type FolderListProps = {
  folders: FolderWithNoteCount[];
  isLoading: boolean;
  error?: string;
  areFoldersEditable: boolean;
  loadFolders: () => void;
};

export const FolderList = ({
  folders,
  isLoading,
  error,
  areFoldersEditable,
  loadFolders,
}: FolderListProps) => {
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<
    string | undefined
  >();
  const [users, setUsers] = useState<TruncatedUserData[]>([]);

  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const fetchUsers = useCallback(async () => {
    const response = await fetch('/api/users');
    const usersData = await response.json();

    const excludedFolderOwnerUsers = usersData.filter(
      (usersData: TruncatedUserData) => {
        return !folders.some(
          (folder: FolderWithNoteCount) =>
            folder.ownerId === usersData.clerkUserId,
        );
      },
    );

    setUsers(excludedFolderOwnerUsers);
  }, [folders]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openDialog = (folderId: string) => {
    setSelectedFolderId(folderId);
    setShareDialogOpen(true);
  };

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
            Wygląda na to, że nie ma tu żadnych folderów do wyświetlenia
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={parentRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {folders.map(folder => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onOpenShareDialog={openDialog}
            isEditable={areFoldersEditable}
            loadFolders={loadFolders}
          />
        ))}
      </div>
      <ShareFolderModal
        isOpen={isShareDialogOpen}
        folderId={selectedFolderId}
        users={users}
        setShareDialogOpen={setShareDialogOpen}
      />
    </>
  );
};
