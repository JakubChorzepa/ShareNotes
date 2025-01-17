import { Folder, Note } from '@prisma/client';
import { useEffect, useState } from 'react';

type FolderWithNotes = Folder & {
  notes: Note[];
};

export const useFolder = (folderId: string) => {
  const [folder, setFolder] = useState<FolderWithNotes | null>();
  const [error, setError] = useState<string | undefined>();
  const [password, setPassword] = useState<string>('');
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const FOLDER_URL = `/api/folders/${folderId}`;

  useEffect(() => {
    const fetchFolder = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(FOLDER_URL);
        const data = await response.json();

        if (response.ok) {
          setFolder(data);
          setAccessGranted(true);
        } else
          switch (response.status) {
            case 401: {
              setIsPasswordRequired(true);

              break;
            }
            default: {
              setError('Wystąpił nieoczekiwany błąd.');
            }
          }
      } catch (error) {
        console.error('Error fetching folder:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolder();
  }, [folderId, FOLDER_URL]);

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAccessGranted(true);
        setFolder(data);
        setError(undefined);
      } else if (response.status === 403) {
        setError('Nieprawidłowe hasło, spróbuj ponownie');
      } else {
        setError('Wystąpił nieoczekiwany błąd podczas weryfikacji hasła.');
      }
    } catch (error) {
      setError('Wystąpił błąd podczas łączenia z serwerem.');
      console.error('Error submitting password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    folder,
    error,
    password,
    setPassword,
    isPasswordRequired,
    accessGranted,
    isLoading,
    handlePasswordSubmit,
  };
};
