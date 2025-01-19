'use client';

import { Note } from '@prisma/client';
import { Trash2 as TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DownloadButton } from '../DownloadButton/download-button';

interface NotesTableProps {
  notes: Note[];
  isOwner: boolean;
  refreshNotes: () => void;
}

export default function NotesTable({
  notes,
  isOwner,
  refreshNotes,
}: NotesTableProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async (noteId: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/notes/delete/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Sukces', { description: 'Notatka została usunięta.' });
      } else {
        toast('Błąd', {
          description: 'Nie udało się usunąć notatki.',
        });
      }
    } catch (error) {
      console.log(error);
      toast('Błąd', {
        description: 'Coś poszło nie tak.',
      });
    } finally {
      setIsDeleting(false);
      refreshNotes();
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tytuł</TableHead>
          <TableHead>Utworzony</TableHead>
          <TableHead>Akcje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(notes.length === 0 && (
          <div className="mt-2 flex items-center justify-end text-lg">
            Brak notatek w folderze
          </div>
        )) ||
          notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>{note.title}</TableCell>
              <TableCell>
                {new Date(note.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <DownloadButton fileTitle={note.title} pdfUrl={note.pdfUrl} />
                  {isOwner && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(note.id)}
                      disabled={isDeleting}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      {isDeleting ? 'Usuwanie...' : 'Usuń'}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
