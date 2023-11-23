/*
  Warnings:

  - Added the required column `background_image` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "background_image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "released" TEXT NOT NULL;
