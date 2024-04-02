/*
  Warnings:

  - You are about to drop the column `postalCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImage` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Event` table. All the data in the column will be lost.
  - Added the required column `cep` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `eventDateEnd` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventDateStart` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "postalCode",
DROP COLUMN "streetAddress",
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ALTER COLUMN "localName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "bannerImage",
DROP COLUMN "tags",
ADD COLUMN     "organizer" TEXT NOT NULL,
ADD COLUMN     "sEOMetaId" TEXT,
DROP COLUMN "eventDateEnd",
ADD COLUMN     "eventDateEnd" TIMESTAMP(3) NOT NULL,
DROP COLUMN "eventDateStart",
ADD COLUMN     "eventDateStart" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "isPaid" DROP DEFAULT,
ALTER COLUMN "checkInDone" DROP DEFAULT;

-- CreateTable
CREATE TABLE "SEOMeta" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT[],
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogUrl" TEXT,
    "ogImage" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,

    CONSTRAINT "SEOMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SEOMeta_id_key" ON "SEOMeta"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sEOMetaId_fkey" FOREIGN KEY ("sEOMetaId") REFERENCES "SEOMeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
