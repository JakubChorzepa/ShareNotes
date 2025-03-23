'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AddNoteSchema, addNoteSchema } from './validation';

type AddNoteDialogProps = {
  folderId: string;
  onNoteAdded?: (note: { title: string; file: File }) => void;
};

export function AddNoteDialog({ folderId, onNoteAdded }: AddNoteDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddNoteSchema>({
    resolver: zodResolver(addNoteSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: AddNoteSchema) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('file', data.file);

      const response = await fetch(`/api/notes/create/${folderId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast.error('Wystąpił błąd podczas dodawania notatki.');
        setIsSubmitting(false);
        return;
      }

      if (response.ok) {
        const newNote = await response.json();
        toast.success('Notatka została dodana!');
        reset();
        if (onNoteAdded) {
          onNoteAdded(newNote);
        }
      }
    } catch (error) {
      console.error(error, 'error');
      toast.error('Nie udało się dodać notatki.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Dodaj notatkę <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-2">
              <h1>Dodaj notatkę</h1>
              <p className="text-sm text-foreground opacity-50">
                Plik nie powinien przekraczać 5MB
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="note-title" className="text-sm font-medium">
              Tytuł notatki
            </Label>
            <Input
              id="note-title"
              {...register('title')}
              placeholder="Wpisz tytuł notatki"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="file" className="text-sm font-medium">
              Plik
            </Label>
            <Input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={event => {
                const file = event.target.files?.[0];
                if (file) {
                  setValue('file', file);
                }
              }}
            />
            {errors.file && (
              <p className="text-sm text-red-500">{errors.file.message}</p>
            )}
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Dodawanie...' : 'Dodaj notatkę'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
