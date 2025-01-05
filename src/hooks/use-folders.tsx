import { Folder } from '@prisma/client';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { FolderFormValues } from '@/components/Folders/NewFolderDialog/validation';

export const useFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const loadFolders = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/api/folders/owned');
      if (!response.ok) {
        throw new Error('Failed to fetch folders');
      }
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      setError('Nie udało się pobrać folderów, spróbuj ponownie');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addFolder = useCallback(async (data: FolderFormValues) => {
    console.log('Adding folder with data:', data);
    try {
      const response = await fetch('/api/folders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error('Coś poszło nie tak', {
          description: 'Wystąpił nieoczekiwany problem przy dodawaniu folderu',
        });

        throw new Error('Failed to add folder');
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
  }, []);

  return {
    folders,
    isLoading,
    error,
    loadFolders,
    addFolder,
  };
};
