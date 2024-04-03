/*
  Warnings:

  - You are about to drop the column `tagsId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `SEOMeta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `SEOMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sEOMetaId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_tagsId_fkey";

-- DropIndex
DROP INDEX "Tags_tags_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tagsId";

-- AlterTable
ALTER TABLE "SEOMeta" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "tags",
ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TagsOnEvents" (
    "eventId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "TagsOnEvents_pkey" PRIMARY KEY ("eventId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_eventId_key" ON "Address"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "SEOMeta_eventId_key" ON "SEOMeta"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tag_key" ON "Tags"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_eventId_key" ON "Ticket"("eventId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEOMeta" ADD CONSTRAINT "SEOMeta_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnEvents" ADD CONSTRAINT "TagsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnEvents" ADD CONSTRAINT "TagsOnEvents_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
