/*
  Warnings:

  - The `tags` column on the `Tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tags]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tagsId" TEXT;

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tags_key" ON "Tags"("tags");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
