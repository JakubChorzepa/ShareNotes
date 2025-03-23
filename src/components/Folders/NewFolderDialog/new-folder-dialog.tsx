'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { NewFolderDialogForm } from './new-folder-dialog-form';
import { FolderFormValues } from './validation';

type NewFolderDialogProps = {
  addFolderHandler: (data: FolderFormValues) => void;
};

export const NewFolderDialog = ({ addFolderHandler }: NewFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: FolderFormValues) => {
    await addFolderHandler(data);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Dodaj folder <CirclePlus />
      </Button>
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
