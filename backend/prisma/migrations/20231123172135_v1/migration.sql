/*
  Warnings:

  - The primary key for the `games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `B` on the `_CollectionToGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToGame" DROP CONSTRAINT "_CollectionToGame_B_fkey";

-- AlterTable
ALTER TABLE "_CollectionToGame" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "games" DROP CONSTRAINT "games_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToGame_AB_unique" ON "_CollectionToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToGame_B_index" ON "_CollectionToGame"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToGame" ADD CONSTRAINT "_CollectionToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
