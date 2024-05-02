/*
  Warnings:

  - You are about to drop the `ManagementToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ManagementToken";

-- CreateTable
CREATE TABLE "managementToken" (
    "id" TEXT NOT NULL,
    "managementToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "managementToken_pkey" PRIMARY KEY ("id")
);
