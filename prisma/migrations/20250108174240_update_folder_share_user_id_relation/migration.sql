-- DropForeignKey
ALTER TABLE "FolderShare" DROP CONSTRAINT "FolderShare_userId_fkey";

-- AddForeignKey
ALTER TABLE "FolderShare" ADD CONSTRAINT "FolderShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
