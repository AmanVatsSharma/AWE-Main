-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('MANUAL', 'AUTOMATED');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "type" "CollectionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionRule" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CollectionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollectionProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionProducts_AB_unique" ON "_CollectionProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionProducts_B_index" ON "_CollectionProducts"("B");

-- AddForeignKey
ALTER TABLE "CollectionRule" ADD CONSTRAINT "CollectionRule_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionProducts" ADD CONSTRAINT "_CollectionProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionProducts" ADD CONSTRAINT "_CollectionProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
