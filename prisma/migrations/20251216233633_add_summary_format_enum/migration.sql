/*
  Warnings:

  - The `defaultSummaryFormat` column on the `UserSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SummaryFormat" AS ENUM ('paragraph', 'bullet_points', 'study_notes');

-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "defaultSummaryFormat",
ADD COLUMN     "defaultSummaryFormat" "SummaryFormat" NOT NULL DEFAULT 'bullet_points';
