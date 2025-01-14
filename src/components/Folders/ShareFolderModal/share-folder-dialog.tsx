import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TruncatedUserData } from '@/types/user';

type ShareFolderModalProps = {
  isOpen: boolean;
  setShareDialogOpen: Dispatch<SetStateAction<boolean>>;
  folderId?: string;
  users: TruncatedUserData[];
};

export const ShareFolderModal = ({
  isOpen,
  setShareDialogOpen,
  folderId,
  users,
}: ShareFolderModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(previous =>
      previous.includes(userId)
        ? previous.filter(id => id !== userId)
        : [...previous, userId],
    );
  };

  const shareFolder = async () => {
    if (!folderId) return;

    await fetch(`/api/folders/share/${folderId}`, {
      method: 'POST',
      body: JSON.stringify({ userIds: selectedUsers }),
      headers: { 'Content-Type': 'application/json' },
    });

    setShareDialogOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setShareDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Udostępnij folder</DialogTitle>
          <DialogDescription>
            Dodaj użytkowników, aby mogli korzystać z twojego folderu.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Input
            placeholder="Wyszukaj użytkowników..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
          <ScrollArea className="max-h-72 space-y-1">
            {users
              .filter(user =>
                user.username
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              )
              .map(user => (
                <div
                  key={user.clerkUserId}
                  className="mt-1 flex cursor-pointer items-center justify-between rounded border p-2 hover:bg-gray-100"
                  onClick={() => toggleUserSelection(user.clerkUserId)}
                >
                  <span>{user.username || user.email}</span>
                  {selectedUsers.includes(user.clerkUserId) && (
                    <span className="text-foreground">✓</span>
                  )}
                </div>
              ))}
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={shareFolder} disabled={selectedUsers.length === 0}>
            Udostępnij
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
