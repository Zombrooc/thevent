-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "addressId" TEXT,
    "eventDescription" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "sEOMetaId" TEXT,
    "eventDateEnd" TIMESTAMP(3) NOT NULL,
    "eventDateStart" TIMESTAMP(3) NOT NULL,
    "bannerImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "localName" TEXT,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "isPaid" BOOLEAN DEFAULT false,
    "checkInDone" BOOLEAN DEFAULT false,
    "qrCodeURL" TEXT,
    "eventId" TEXT,
    "endSellingAt" TIMESTAMP(3) NOT NULL,
    "startSellingAt" TIMESTAMP(3) NOT NULL,
    "ticketDescription" TEXT NOT NULL,
    "ticketName" TEXT NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL,
    "ticketStockAvailable" INTEGER NOT NULL,
    "stripeID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SEOMeta" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT[],
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogUrl" TEXT,
    "ogImage" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SEOMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_eventId_key" ON "Address"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "SEOMeta_eventId_key" ON "SEOMeta"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTags_AB_unique" ON "_EventToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTags_B_index" ON "_EventToTags"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEOMeta" ADD CONSTRAINT "SEOMeta_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
