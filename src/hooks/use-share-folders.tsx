import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { TruncatedUserData } from '@/types/user';

type UseShareFolderProps = {
  folderId?: string;
  closeModal: () => void;
};

export const useShareFolder = ({
  folderId,
  closeModal,
}: UseShareFolderProps) => {
  const [sharedUsers, setSharedUsers] = useState<TruncatedUserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSharedUsers, setSelectedSharedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const fetchSharedUsers = useCallback(async () => {
    if (!folderId) return;
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch(`/api/folders/shared/${folderId}`);
      if (!response.ok)
        throw new Error('Nie udało się pobrać listy użytkowników');

      const data = await response.json();
      setSharedUsers(data);
    } catch (error) {
      toast.error('Błąd pobierania użytkowników', {
        description: 'Spróbuj ponownie później.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [folderId]);

  const shareFolder = useCallback(async () => {
    if (!folderId || selectedUsers.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/folders/share/${folderId}`, {
        method: 'POST',
        body: JSON.stringify({ userIds: selectedUsers }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Nie udało się udostępnić folderu');

      toast.success('Folder został udostępniony pomyślnie');
      await fetchSharedUsers();
      setSelectedUsers([]);
      closeModal();
    } catch (error) {
      toast.error('Błąd podczas udostępniania folderu');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [folderId, selectedUsers, fetchSharedUsers, closeModal]);

  const revokeAccess = useCallback(async () => {
    if (!folderId || selectedSharedUsers.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/folders/revoke/${folderId}`, {
        method: 'POST',
        body: JSON.stringify({ userIds: selectedSharedUsers }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Nie udało się odebrać uprawnień');

      toast.success('Uprawnienia zostały odebrane pomyślnie');
      await fetchSharedUsers();
      setSelectedSharedUsers([]);
      closeModal();
    } catch (error) {
      toast.error('Błąd podczas odbierania uprawnień');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [folderId, selectedSharedUsers, fetchSharedUsers, closeModal]);

  const toggleUserSelection = useCallback(
    (userId: string) => {
      setSelectedUsers(previous =>
        previous.includes(userId)
          ? previous.filter(id => id !== userId)
          : [...previous, userId],
      );
    },
    [setSelectedUsers],
  );

  const toggleSharedUserSelection = useCallback(
    (userId: string) => {
      setSelectedSharedUsers(previous =>
        previous.includes(userId)
          ? previous.filter(id => id !== userId)
          : [...previous, userId],
      );
    },
    [setSelectedSharedUsers],
  );

  return {
    sharedUsers,
    selectedUsers,
    selectedSharedUsers,
    isLoading,
    error,
    fetchSharedUsers,
    shareFolder,
    revokeAccess,
    toggleUserSelection,
    toggleSharedUserSelection,
  };
};
