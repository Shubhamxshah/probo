/*
  Warnings:

  - You are about to drop the column `category` on the `stockSymbol` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `stockSymbol` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stockSymbol" DROP COLUMN "category",
DROP COLUMN "endTime";
