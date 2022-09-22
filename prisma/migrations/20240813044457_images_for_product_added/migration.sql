/*
  Warnings:

  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "trending" BOOLEAN NOT NULL DEFAULT false;
