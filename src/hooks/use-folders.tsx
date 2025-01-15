import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { FolderFormValues } from '@/components/Folders/NewFolderDialog/validation';
import { FolderWithNoteCount } from '@/types/folder';

export const useFolders = (
  apiEndpoint: string,
  enableAddFolder: boolean = false,
) => {
  const [folders, setFolders] = useState<FolderWithNoteCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const loadFolders = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch folders');
      }
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      setError('Nie udało się pobrać folderów, spróbuj ponownie');
      toast.error('Nie udało się pobrać folderów');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint]);

  const addFolder = useCallback(
    async (data: FolderFormValues) => {
      if (!enableAddFolder) {
        throw new Error('Adding folder is disabled');
      }
      try {
        const response = await fetch('/api/folders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          toast.error('Coś poszło nie tak', {
            description:
              'Wystąpił nieoczekiwany problem przy dodawaniu folderu',
          });
        }

        toast.success('Folder został dodany pomyślnie');

        const newFolder = await response.json();
        setFolders(previousFolders => [newFolder, ...previousFolders]);
      } catch (error) {
        console.error('Error while adding folder:', error);
        toast.error('Coś poszło nie tak', {
          description: 'Wystąpił nieoczekiwany problem przy dodawaniu folderu',
        });
      }
    },
    [enableAddFolder],
  );

  return {
    folders,
    isLoading,
    error,
    loadFolders,
    addFolder,
  };
};
