/*
  Warnings:

  - You are about to drop the `Forms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Forms" DROP CONSTRAINT "Forms_eventId_fkey";

-- DropTable
DROP TABLE "Forms";

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_ticketId_key" ON "Form"("ticketId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
