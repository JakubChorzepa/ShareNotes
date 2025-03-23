'use client';

import { useUser } from '@clerk/nextjs';
import { ArrowLeft as BackIcon, RefreshCcw } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import { AddNoteDialog } from '@/components/Notes/AddNoteDialog/add-note-dialog';
import NotesTable from '@/components/Notes/NotesTable/notes-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFolder } from '@/hooks/use-folder';

type FolderPageParams = {
  folderId: string;
};

const BackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant={'outline'}>
      <BackIcon className="mr-2 h-4 w-4" />
      Wróć
    </Button>
  );
};

function FolderPage() {
  const params = useParams<FolderPageParams>();

  const {
    folder,
    password,
    error,
    setPassword,
    isPasswordRequired,
    accessGranted,
    isLoading,
    handlePasswordSubmit,
    refreshNotes,
    notes,
  } = useFolder(params.folderId);

  const router = useRouter();
  const { user } = useUser();

  const isOwner = !!user && !!folder && user.id === folder.ownerId;

  if (!user) {
    return (
      <div className="mt-2 flex flex-col gap-5">
        <div>
          <BackButton />
        </div>
        <div className="flex items-center justify-center">
          Nie jesteś zalogowany. Zaloguj się, aby uzyskać dostęp do folderu.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-2 flex items-center justify-center">Ładowanie...</div>
    );
  }

  if (!accessGranted && !isPasswordRequired) {
    return (
      <div className="mt-2 flex flex-col gap-5">
        <div>
          <BackButton />
        </div>
        <div className="flex items-center justify-center">
          Nie posiadasz dostępu do tego folderu. Poproś właściciela o jego
          udostępnienie.
        </div>
      </div>
    );
  }

  if (isPasswordRequired && !accessGranted) {
    return (
      <div className="mt-2 flex flex-col gap-5">
        <div>
          <BackButton />
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-center">
            Dostęp do folderu jest zabezpieczony hasłem. Wprowadź hasło, aby
            uzyskać dostęp.
          </h1>
          <form
            onSubmit={(event: FormEvent) => {
              handlePasswordSubmit(event);
            }}
            className="flex flex-col items-center space-y-2"
          >
            <Input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Wpisz hasło"
              className="w-64"
            />
            <p className="text-sm text-red-500">{error}</p>
            <Button type="submit" className="w-64">
              Uzyskaj dostęp
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (folder) {
    return (
      <div className="mt-2 flex flex-col gap-10">
        <div className="flex justify-between">
          <Button onClick={() => router.back()} variant={'outline'}>
            <BackIcon className="mr-2 h-4 w-4" />
            Wróć
          </Button>
          <h1 className="text-xl font-bold md:text-2xl">{folder.name}</h1>
          <div className="flex gap-2">
            {isOwner && <AddNoteDialog folderId={params.folderId} />}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:justify-between">
            <h1 className="text-lg font-semibold">
              Notatki zawarte w folderze:
            </h1>
            <Button onClick={() => refreshNotes()} variant={'outline'}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Odśwież
            </Button>
          </div>

          <NotesTable
            notes={notes}
            isOwner={isOwner}
            refreshNotes={refreshNotes}
          />
        </div>
      </div>
    );
  }

  return <div>Nieoczekiwany błąd. Spróbuj ponownie później.</div>;
}

export default FolderPage;
