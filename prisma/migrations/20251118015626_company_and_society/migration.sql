-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocietyToCompany" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "society_id" TEXT NOT NULL,

    CONSTRAINT "SocietyToCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Society" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_user_id_key" ON "company"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SocietyToCompany_company_id_key" ON "SocietyToCompany"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "SocietyToCompany_society_id_key" ON "SocietyToCompany"("society_id");

-- CreateIndex
CREATE UNIQUE INDEX "SocietyToCompany_company_id_society_id_key" ON "SocietyToCompany"("company_id", "society_id");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyToCompany" ADD CONSTRAINT "SocietyToCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyToCompany" ADD CONSTRAINT "SocietyToCompany_society_id_fkey" FOREIGN KEY ("society_id") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
