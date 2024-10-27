/*
  Warnings:

  - Changed the type of `orderType` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stockType` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "orderType",
ADD COLUMN     "orderType" TEXT NOT NULL,
DROP COLUMN "stockType",
ADD COLUMN     "stockType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "OrderType";

-- DropEnum
DROP TYPE "StockType";
