import { Folder } from '@prisma/client';

export type FolderWithNoteCount = Folder & { noteCount: number };
