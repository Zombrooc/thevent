-- CreateTable
CREATE TABLE "ManagementToken" (
    "id" TEXT NOT NULL,
    "managementToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagementToken_pkey" PRIMARY KEY ("id")
);
