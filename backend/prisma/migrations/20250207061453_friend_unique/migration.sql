/*
  Warnings:

  - A unique constraint covering the columns `[from_id,to_id]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Friends_from_id_to_id_key` ON `Friends`(`from_id`, `to_id`);
