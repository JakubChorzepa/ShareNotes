'use client';
import { useParams } from 'next/navigation';

type FolderPageParams = {
  folderId: string;
};

function FolderPage() {
  const params = useParams<FolderPageParams>();

  return (
    <div className="flex justify-center text-lg">
      Folder o id: {params.folderId}
    </div>
  );
}

export default FolderPage;
