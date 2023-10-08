/*
  Warnings:

  - You are about to drop the column `location` on the `Station` table. All the data in the column will be lost.
  - Added the required column `posX` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posY` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station" DROP COLUMN "location",
ADD COLUMN     "posX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posY" DOUBLE PRECISION NOT NULL;
