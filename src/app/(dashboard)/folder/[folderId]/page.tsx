'use client';
import { useParams } from 'next/navigation';

import { useFolder } from '@/hooks/use-folder';

type FolderPageParams = {
  folderId: string;
};

function FolderPage() {
  const params = useParams<FolderPageParams>();

  const {
    folder,
    error,
    password,
    setPassword,
    isPasswordRequired,
    accessGranted,
    handlePasswordSubmit,
  } = useFolder(params.folderId);

  console.log(accessGranted);

  if (!accessGranted && !isPasswordRequired) {
    return (
      <div>
        Nie posiadasz dostępu do tego folderu, poproś właściciela o jego
        uzyskanie
      </div>
    );
  }

  if (isPasswordRequired) {
    return (
      <div className="flex items-center justify-center">
        Dostęp do folderu zabezpieczony jest hasłem
      </div>
    );
  }

  return (
    <div className="flex justify-center text-lg">
      Folder o id: {params.folderId}
    </div>
  );
}

export default FolderPage;
