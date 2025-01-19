import { Folder, Note } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';

type FolderWithNotes = Folder & {
  notes: Note[];
};

export const useFolder = (folderId: string) => {
  const [folder, setFolder] = useState<FolderWithNotes | null>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [password, setPassword] = useState<string>();
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const FOLDER_URL = `/api/folders/${folderId}`;

  const fetchFolder = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch(FOLDER_URL, {
        method: password ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...(password && { body: JSON.stringify({ password }) }),
      });

      const data = await response.json();

      if (response.ok) {
        setFolder(data);
        setNotes(data.notes);
        setAccessGranted(true);
        setError(undefined);
      } else {
        switch (response.status) {
          case 401: {
            setIsPasswordRequired(true);
            break;
          }
          case 403: {
            setError('Dostęp zabroniony.');
            break;
          }
          default: {
            setError('Wystąpił nieoczekiwany błąd.');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching folder:', error);
      setError('Błąd połączenia z serwerem.');
    } finally {
      setIsLoading(false);
    }
  }, [FOLDER_URL]);

  useEffect(() => {
    fetchFolder();
  }, [folderId, fetchFolder]);

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await fetch(FOLDER_URL, {
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
        setNotes(data.notes);
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

  const refreshNotes = async () => {
    if (!accessGranted) return;

    try {
      const response = await fetch(FOLDER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(data.notes);
      } else {
        setError('Nie udało się odświeżyć listy notatek.');
      }
    } catch (error) {
      console.error('Error refreshing notes:', error);
    }
  };

  return {
    folder,
    notes,
    error,
    password,
    setPassword,
    isPasswordRequired,
    accessGranted,
    isLoading,
    handlePasswordSubmit,
    refreshNotes,
  };
};
