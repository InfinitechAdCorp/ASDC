/*
  Warnings:

  - You are about to drop the column `endDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomid` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endDate",
DROP COLUMN "roomid",
DROP COLUMN "startDate",
DROP COLUMN "userid",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "room_id" INTEGER NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;
