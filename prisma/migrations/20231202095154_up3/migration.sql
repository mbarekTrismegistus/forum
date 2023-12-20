/*
  Warnings:

  - You are about to alter the column `userID` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Char(60)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Char(60)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_userID_fkey`;

-- AlterTable
ALTER TABLE `posts` MODIFY `userID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
