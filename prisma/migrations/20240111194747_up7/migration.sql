/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "likes_postId_userId_commentId_key";

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "commentId" DROP NOT NULL,
ALTER COLUMN "commentId" DROP DEFAULT,
ALTER COLUMN "postId" DROP NOT NULL,
ALTER COLUMN "postId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");
