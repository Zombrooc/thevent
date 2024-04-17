/*
  Warnings:

  - You are about to drop the column `checkInDone` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `qrCodeURL` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "checkInDone" BOOLEAN DEFAULT false,
ADD COLUMN     "qrCodeURL" TEXT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "checkInDone",
DROP COLUMN "isPaid",
DROP COLUMN "qrCodeURL";
