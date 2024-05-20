/*
  Warnings:

  - You are about to drop the `ManagementToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ManagementToken";

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "pageViews" INTEGER,
    "totalRevenue" DOUBLE PRECISION,
    "avgRevenue" DOUBLE PRECISION,
    "soldTickets" INTEGER,
    "sellQuantity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
