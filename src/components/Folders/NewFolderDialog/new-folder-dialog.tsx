'use client';

import { Folder } from '@prisma/client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { NewFolderDialogForm } from './new-folder-dialog-form';
import { FolderFormValues } from './validation';

type NewFolderDialogProps = {
  onFolderAdded: (folder: Folder) => void;
};

export const NewFolderDialog = ({ onFolderAdded }: NewFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: FolderFormValues) => {
    const response = await fetch('/api/folders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newFolder = await response.json();
      onFolderAdded(newFolder);
      setIsOpen(false);
    } else {
      console.error('Nie udało się dodać folderu');
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dodaj folder</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj nowy folder</DialogTitle>
          </DialogHeader>
          <NewFolderDialogForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};
