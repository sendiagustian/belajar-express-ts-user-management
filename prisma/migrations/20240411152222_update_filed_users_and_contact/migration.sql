/*
  Warnings:

  - You are about to drop the column `contact_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `portal_cde` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portalCde` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_contact_id_fkey`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `contact_id`,
    DROP COLUMN `portal_cde`,
    ADD COLUMN `contactId` INTEGER NOT NULL,
    ADD COLUMN `portalCde` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `firstName` VARCHAR(100) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
