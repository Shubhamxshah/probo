/*
  Warnings:

  - You are about to drop the column `symbol` on the `stockSymbol` table. All the data in the column will be lost.
  - Added the required column `stockSymbol` to the `stockSymbol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stockSymbol" DROP COLUMN "symbol",
ADD COLUMN     "stockSymbol" TEXT NOT NULL;
