/*
  Warnings:

  - You are about to drop the column `threadId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `thread` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categorieId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_threadId_fkey`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `threadId`,
    ADD COLUMN `categorieId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `thread`;

-- CreateTable
CREATE TABLE `categorie` (
    `id` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categorie_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
