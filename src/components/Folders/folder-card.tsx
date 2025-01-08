'use client';

import { Copy, LogIn } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { EllipsisText } from '@/components/ElipsisText/elipsis-text';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FolderWithNoteCount } from '@/types/folder';

type FolderCardProps = {
  folder: FolderWithNoteCount;
};

export const FolderCard = ({ folder }: FolderCardProps) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(folder.id);
    toast.success('Skopiowano identyfikator folderu do schowka');
  };

  return (
    <div className="relative flex flex-col justify-between rounded-md border p-4">
      <h3 className="text-lg font-bold">{folder.name}</h3>
      <div className="flex flex-col text-[10px] text-gray-700 opacity-80">
        <div className="flex items-center">
          <EllipsisText
            text={`ID: ${folder.id}`}
            className="mr-1"
            maxLength={25}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 text-gray-700 hover:text-black"
                  onClick={handleCopyId}
                >
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Skopiuj ID</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="-mt-1 text-[10px]">
          Utworzono: {new Date(folder.createdAt).toLocaleDateString()}
        </span>
        <span className="text-[10px]">Notatki: {folder.noteCount}</span>
      </div>
      <Link href={`/folder/${folder.id}`}>
        <Button className="absolute bottom-0 right-0 h-full">
          <LogIn />
        </Button>
      </Link>
    </div>
  );
};
