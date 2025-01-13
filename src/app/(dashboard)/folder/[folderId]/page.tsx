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

  console.log(folder);

  return (
    <div className="flex justify-center text-lg">
      Folder o id: {params.folderId}
    </div>
  );
}

export default FolderPage;
