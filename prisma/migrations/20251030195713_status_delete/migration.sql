/*
  Warnings:

  - Added the required column `statusDelete` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatusDelete" AS ENUM ('ACTIVE', 'DISABLED');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "statusDelete" "TransactionStatusDelete" NOT NULL;
