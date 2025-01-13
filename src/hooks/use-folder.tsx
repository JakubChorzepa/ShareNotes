import { useEffect, useState } from 'react';

interface Folder {
  id: string;
  name: string;
  password?: string;
}

export const useFolder = (folderId: string) => {
  const [folder, setFolder] = useState<Folder | null>();
  const [error, setError] = useState<string | null>();
  const [password, setPassword] = useState<string>('');
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

  const FOLDER_URL = `/api/folders/${folderId}`;

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await fetch(FOLDER_URL);
      const data = await response.json();

      if (response.status === 200) {
        setFolder(data);
        setIsPasswordRequired(!!data.password);
      } else {
        setError(data.error);
      }
    };

    fetchFolder();
  }, [folderId, FOLDER_URL]);

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/folders/${folderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAccessGranted(true);
    } else {
      setError(data.error || 'Invalid password');
    }
  };

  return {
    folder,
    error,
    password,
    setPassword,
    isPasswordRequired,
    accessGranted,
    handlePasswordSubmit,
  };
};
