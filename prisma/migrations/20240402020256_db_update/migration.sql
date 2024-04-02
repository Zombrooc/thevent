/*
  Warnings:

  - You are about to drop the column `cep` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrls` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `localName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerImage` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDateEnd` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDateStart` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDescription` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endSellingAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startSellingAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketDescription` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketName` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketPrice` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketStockAvailable` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "cep",
DROP COLUMN "street",
DROP COLUMN "userId",
ADD COLUMN     "localName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "eventDate",
DROP COLUMN "imageUrls",
DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "bannerImage" TEXT NOT NULL,
ADD COLUMN     "eventDateEnd" TEXT NOT NULL,
ADD COLUMN     "eventDateStart" TEXT NOT NULL,
ADD COLUMN     "eventDescription" TEXT NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "addressId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "price",
DROP COLUMN "userId",
ADD COLUMN     "endSellingAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startSellingAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ticketDescription" TEXT NOT NULL,
ADD COLUMN     "ticketName" TEXT NOT NULL,
ADD COLUMN     "ticketPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ticketStockAvailable" INTEGER NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
