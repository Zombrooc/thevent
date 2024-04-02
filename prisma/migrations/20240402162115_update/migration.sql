-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_id_key" ON "Tags"("id");
