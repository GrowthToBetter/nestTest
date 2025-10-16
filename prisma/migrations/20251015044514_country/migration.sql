-- CreateTable
CREATE TABLE "country" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "population" TEXT NOT NULL,
    "capital" TEXT NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("code")
);
