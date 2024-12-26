-- CreateTable
CREATE TABLE "ShortenedUrl" (
    "id" SERIAL NOT NULL,
    "accesses" INTEGER NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleteDate" TIMESTAMP(3),

    CONSTRAINT "ShortenedUrl_pkey" PRIMARY KEY ("id")
);
