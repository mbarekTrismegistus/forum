/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId,commentId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likes_postId_userId_commentId_key" ON "likes"("postId", "userId", "commentId");
