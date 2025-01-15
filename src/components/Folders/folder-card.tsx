'use client';

import { Copy, EllipsisVertical, LogIn } from 'lucide-react';
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
  onOpenShareDialog: (folderId: string) => void;
  isEditable: boolean;
};

export const FolderCard = ({
  folder,
  onOpenShareDialog,
  isEditable,
}: FolderCardProps) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(folder.id);
    toast.success('Skopiowano identyfikator folderu do schowka');
  };

  return (
    <div className="relative flex flex-row justify-between rounded-md border p-4">
      <div className="flex flex-col text-[10px] text-foreground">
        <h3 className="text-lg font-bold">{folder.name}</h3>
        <div className="flex flex-col opacity-60">
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
      </div>

      <div
        className={`flex flex-col content-center ${isEditable ? 'justify-between' : 'justify-end'}`}
      >
        {isEditable && (
          <Button
            variant={'ghost'}
            className="flex content-center justify-center p-1"
            onClick={() => onOpenShareDialog(folder.id)}
          >
            <EllipsisVertical size={21} />
          </Button>
        )}
        <Link href={`/folder/${folder.id}`}>
          <Button className="p-2">
            <LogIn />
          </Button>
        </Link>
      </div>
    </div>
  );
};
