-- CreateIndex
CREATE FULLTEXT INDEX `categorie_id_idx` ON `categorie`(`id`);

-- CreateIndex
CREATE FULLTEXT INDEX `posts_title_content_idx` ON `posts`(`title`, `content`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_id_firstName_lastName_idx` ON `users`(`id`, `firstName`, `lastName`);
