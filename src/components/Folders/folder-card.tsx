'use client';

import { Folder } from '@prisma/client';
import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button'; // ShadCN Button

type FolderCardProps = {
  folder: Folder;
};

export const FolderCard = ({ folder }: FolderCardProps) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(folder.id);
  };

  return (
    <div className="relative flex flex-col items-start rounded-md border p-4 shadow-md">
      <h3 className="text-lg font-bold">{folder.name}</h3>
      <div
        className="bottom-2 left-2 flex items-center text-[10px] text-gray-700"
        style={{ opacity: 0.8 }}
      >
        <span className="mr-1">ID: {folder.id}</span>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 text-gray-700 hover:text-black"
          onClick={handleCopyId}
        >
          <Copy />
        </Button>
      </div>
    </div>
  );
};

// Todo: add toast message on successful copy
