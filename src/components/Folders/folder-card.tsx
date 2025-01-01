import { Folder } from '@prisma/client';

type FolderCardProps = {
  folder: Folder;
};

export const FolderCard = ({ folder }: FolderCardProps) => (
  <div className="flex items-center justify-between rounded-md border p-4 shadow-sm transition hover:shadow-md">
    <div>
      <h2 className="text-lg font-semibold">{folder.name}</h2>
      <p className="text-sm text-gray-500">
        Utworzono: {new Date(folder.createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);
