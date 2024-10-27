/*
  Warnings:

  - You are about to drop the column `endData` on the `stockSymbol` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `stockSymbol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stockSymbol" DROP COLUMN "endData",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
