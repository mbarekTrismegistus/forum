-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` MEDIUMTEXT NOT NULL,
    `notifierId` VARCHAR(191) NOT NULL,
    `notifiedId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `read` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `notifications_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_notifierId_fkey` FOREIGN KEY (`notifierId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_notifiedId_fkey` FOREIGN KEY (`notifiedId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
