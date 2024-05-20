/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `analytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "analytics_eventId_key" ON "analytics"("eventId");
