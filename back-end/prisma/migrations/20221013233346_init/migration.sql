/*
  Warnings:

  - Made the column `image` on table `todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "image" SET NOT NULL;
