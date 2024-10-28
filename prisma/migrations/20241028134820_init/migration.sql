-- CreateEnum
CREATE TYPE "TICKET_STATUS" AS ENUM ('RESERVED', 'SUCCESSFUL', 'FAILED');

-- CreateEnum
CREATE TYPE "EVENT_STATUS" AS ENUM ('ACTIVE', 'ARCHIVED', 'DISABLED', 'CANCELED', 'DRAFT');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "eventDateEnd" TIMESTAMP(3) NOT NULL,
    "eventDateStart" TIMESTAMP(3) NOT NULL,
    "bannerImage" TEXT NOT NULL,
    "eventStatus" "EVENT_STATUS" NOT NULL DEFAULT 'ACTIVE',
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
    "eventId" TEXT,
    "endSellingAt" TIMESTAMP(3) NOT NULL,
    "startSellingAt" TIMESTAMP(3) NOT NULL,
    "ticketDescription" TEXT NOT NULL,
    "ticketName" TEXT NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL,
    "ticketSubTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ticketDefaultAvailableStock" INTEGER NOT NULL,
    "stripeID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketReservation" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "status" "TICKET_STATUS" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "customData" JSONB,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "TicketReservation_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT,
    "total" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL DEFAULT 0,
    "paymentStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "checkInDone" BOOLEAN DEFAULT false,
    "qrCodeURL" TEXT,
    "userAnswers" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avgRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "soldTickets" INTEGER NOT NULL DEFAULT 0,
    "sellQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_eventId_key" ON "analytics"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Form_ticketId_key" ON "Form"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTags_AB_unique" ON "_EventToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTags_B_index" ON "_EventToTags"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketReservation" ADD CONSTRAINT "TicketReservation_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketReservation" ADD CONSTRAINT "TicketReservation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEOMeta" ADD CONSTRAINT "SEOMeta_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
