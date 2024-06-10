-- CreateTable
CREATE TABLE "Forms" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Forms" ADD CONSTRAINT "Forms_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
