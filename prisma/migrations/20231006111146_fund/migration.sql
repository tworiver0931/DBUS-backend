-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenAmount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Fund" (
    "id" SERIAL NOT NULL,
    "fundAmount" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL,
    "isEnd" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FundToStation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FundToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FundToStation_AB_unique" ON "_FundToStation"("A", "B");

-- CreateIndex
CREATE INDEX "_FundToStation_B_index" ON "_FundToStation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FundToUser_AB_unique" ON "_FundToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FundToUser_B_index" ON "_FundToUser"("B");

-- AddForeignKey
ALTER TABLE "_FundToStation" ADD CONSTRAINT "_FundToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "Fund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundToStation" ADD CONSTRAINT "_FundToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundToUser" ADD CONSTRAINT "_FundToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Fund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundToUser" ADD CONSTRAINT "_FundToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
