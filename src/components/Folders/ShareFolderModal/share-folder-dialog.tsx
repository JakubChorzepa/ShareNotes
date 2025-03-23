import { Check, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useShareFolder } from '@/hooks/use-share-folders';
import { TruncatedUserData } from '@/types/user';

type ShareFolderModalProps = {
  isOpen: boolean;
  setShareDialogOpen: (open: boolean) => void;
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
  const closeModal = () => setShareDialogOpen(false);
  const {
    sharedUsers,
    selectedUsers,
    selectedSharedUsers,
    fetchSharedUsers,
    shareFolder,
    revokeAccess,
    toggleUserSelection,
    toggleSharedUserSelection,
  } = useShareFolder({ folderId, closeModal });

  useEffect(() => {
    if (folderId) fetchSharedUsers();
  }, [folderId, fetchSharedUsers]);

  const filteredUsers = users.filter(
    user =>
      !sharedUsers.some(shared => shared.clerkUserId === user.clerkUserId),
  );

  return (
    <Dialog open={isOpen} onOpenChange={setShareDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Zarządzaj udostępnieniem folderu</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="share">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Udostępnij</TabsTrigger>
            <TabsTrigger value="revoke">Odbierz prawa</TabsTrigger>
          </TabsList>
          <TabsContent value="share">
            <Input
              placeholder="Wyszukaj użytkowników..."
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
            <ScrollArea className="my-2 h-52">
              {filteredUsers
                .filter(user =>
                  user.username
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .map(user => (
                  <div
                    key={user.clerkUserId}
                    className="flex items-center justify-between rounded-md p-2 hover:bg-gray-200"
                    onClick={() => toggleUserSelection(user.clerkUserId)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{user.username}</span>
                        <span className="text-sm opacity-80">{user.email}</span>
                      </div>
                    </div>
                    {selectedUsers.includes(user.clerkUserId) && (
                      <Check size={16} />
                    )}
                  </div>
                ))}
            </ScrollArea>
            <Separator />
            <DialogFooter>
              <Button
                onClick={shareFolder}
                disabled={selectedUsers.length === 0}
                className="mt-4"
              >
                Udostępnij
              </Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="revoke">
            <ScrollArea className="mt-2 h-52">
              <Separator />
              {sharedUsers.map(user => (
                <div
                  key={user.clerkUserId}
                  className="flex items-center justify-between rounded-md p-2 hover:bg-gray-200"
                  onClick={() => toggleSharedUserSelection(user.clerkUserId)}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.username}</span>
                      <span className="text-sm opacity-80">{user.email}</span>
                    </div>
                  </div>
                  {selectedSharedUsers.includes(user.clerkUserId) && (
                    <XCircle size={16} className="text-red-500" />
                  )}
                </div>
              ))}
            </ScrollArea>
            <Separator />
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={revokeAccess}
                disabled={selectedSharedUsers.length === 0}
                className="mt-4"
              >
                Odbierz prawa
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
