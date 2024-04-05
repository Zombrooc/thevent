/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_eventId_key" ON "Address"("eventId");
