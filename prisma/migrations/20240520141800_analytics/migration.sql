/*
  Warnings:

  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_eventId_fkey";

-- DropTable
DROP TABLE "Analytics";

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "pageViews" INTEGER,
    "totalRevenue" DOUBLE PRECISION,
    "avgRevenue" DOUBLE PRECISION,
    "soldTickets" INTEGER,
    "sellQuantity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
