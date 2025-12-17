/*
  Warnings:

  - Changed the type of `format` on the `ClipSummary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ClipSummary" DROP COLUMN "format",
ADD COLUMN     "format" "SummaryFormat" NOT NULL;

-- CreateIndex
CREATE INDEX "ClipSummary_clipId_format_idx" ON "ClipSummary"("clipId", "format");

-- CreateIndex
CREATE UNIQUE INDEX "ClipSummary_clipId_format_model_promptVersion_inputHash_key" ON "ClipSummary"("clipId", "format", "model", "promptVersion", "inputHash");
