import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface DeleteFolderDialogProps {
  folderId: string;
  folderName: string;
  onDelete: () => void;
}

export const DeleteFolderDialog: React.FC<DeleteFolderDialogProps> = ({
  folderId,
  folderName,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/folders/delete/${folderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Folder został usunięty');
        onDelete();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Nie udało się usunąć folderu');
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error('Wystąpił błąd podczas usuwania folderu');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={evenet => event?.preventDefault()}>
          <span className="text-red-500">Usuń folder</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć folder?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta akcja jest nieodwracalna. Folder <strong>{folderName}</strong>{' '}
            oraz wszystkie związane z nim dane zostaną trwale usunięte.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white"
          >
            {isDeleting ? 'Usuwanie...' : 'Usuń'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
