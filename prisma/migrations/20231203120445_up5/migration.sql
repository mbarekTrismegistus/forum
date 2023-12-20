/*
  Warnings:

  - You are about to drop the column `postId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `posts` table. All the data in the column will be lost.
  - Added the required column `threadId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_postId_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_userID_fkey`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `postId`,
    DROP COLUMN `userID`,
    ADD COLUMN `threadId` INTEGER NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
