'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

import { Button } from '@/components/ui/button'; // ShadCN Button
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'; // ShadCN Dialog
import { Input } from '@/components/ui/input';

type NewFolderDialogProps = {
  onAddFolder: (name: string) => void;
};

export const NewFolderDialog = ({ onAddFolder }: NewFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleSubmit = () => {
    if (folderName.trim()) {
      onAddFolder(folderName);
      setFolderName('');
      setIsOpen(false);
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
          <Input
            placeholder="Nazwa folderu"
            value={folderName}
            onChange={event => setFolderName(event.target.value)}
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleSubmit}>Dodaj</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
