/*
  Warnings:

  - A unique constraint covering the columns `[privateKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `privateKey` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "privateKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_privateKey_key" ON "User"("privateKey");
