/*
  Warnings:

  - Made the column `pageViews` on table `analytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalRevenue` on table `analytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avgRevenue` on table `analytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `soldTickets` on table `analytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellQuantity` on table `analytics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "analytics" ALTER COLUMN "pageViews" SET NOT NULL,
ALTER COLUMN "pageViews" SET DEFAULT 0,
ALTER COLUMN "totalRevenue" SET NOT NULL,
ALTER COLUMN "totalRevenue" SET DEFAULT 0.0,
ALTER COLUMN "avgRevenue" SET NOT NULL,
ALTER COLUMN "avgRevenue" SET DEFAULT 0.0,
ALTER COLUMN "soldTickets" SET NOT NULL,
ALTER COLUMN "soldTickets" SET DEFAULT 0,
ALTER COLUMN "sellQuantity" SET NOT NULL,
ALTER COLUMN "sellQuantity" SET DEFAULT 0;
