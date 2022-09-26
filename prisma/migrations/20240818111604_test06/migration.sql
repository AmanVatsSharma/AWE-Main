/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_customerId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "customerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "billingAddress",
DROP COLUMN "shippingAddress",
ADD COLUMN     "billingAddressId" INTEGER,
ADD COLUMN     "shippingAddressId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
