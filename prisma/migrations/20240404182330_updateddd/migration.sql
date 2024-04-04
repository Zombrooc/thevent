/*
  Warnings:

  - You are about to drop the `TagsOnEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnEvents" DROP CONSTRAINT "TagsOnEvents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnEvents" DROP CONSTRAINT "TagsOnEvents_tagId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "isPaid" SET DEFAULT false,
ALTER COLUMN "checkInDone" SET DEFAULT false;

-- DropTable
DROP TABLE "TagsOnEvents";

-- CreateTable
CREATE TABLE "_EventToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTags_AB_unique" ON "_EventToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTags_B_index" ON "_EventToTags"("B");

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
