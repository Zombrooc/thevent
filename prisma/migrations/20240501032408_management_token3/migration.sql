/*
  Warnings:

  - You are about to drop the `managementToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "managementToken";

-- CreateTable
CREATE TABLE "ManagementToken" (
    "id" TEXT NOT NULL,
    "managementToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagementToken_pkey" PRIMARY KEY ("id")
);
