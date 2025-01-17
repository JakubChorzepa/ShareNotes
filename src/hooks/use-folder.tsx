import { useEffect, useState } from 'react';

interface Folder {
  id: string;
  name: string;
  password?: string;
}

export const useFolder = (folderId: string) => {
  const [folder, setFolder] = useState<Folder | null>();
  const [error, setError] = useState<string | undefined>();
  const [password, setPassword] = useState<string>('');
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          setIsPasswordRequired(!!data.password);
        } else
          switch (response.status) {
            case 401: {
              setIsPasswordRequired(true);
              setError('Folder wymaga hasła.');

              break;
            }
            case 403: {
              setError('Brak dostępu do folderu.');

              break;
            }
            case 404: {
              setError('Folder nie został znaleziony.');

              break;
            }
            default: {
              setError('Wystąpił nieoczekiwany błąd.');
            }
          }
      } catch (error) {
        setError('Wystąpił błąd podczas łączenia z serwerem.');
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
        setFolder(data); // Jeśli API zwraca dane folderu po weryfikacji hasła
        setError(undefined);
      } else if (response.status === 403) {
        setError('Nieprawidłowe hasło.');
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
