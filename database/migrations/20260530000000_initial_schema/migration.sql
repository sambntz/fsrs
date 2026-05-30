-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `decks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `decks_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_cards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `front` TEXT NOT NULL,
    `back` TEXT NOT NULL,
    `deck_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `flash_cards_deck_id_idx`(`deck_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_card_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flash_card_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `flash_card_tags_flash_card_id_idx`(`flash_card_id`),
    INDEX `flash_card_tags_tag_id_idx`(`tag_id`),
    UNIQUE INDEX `flash_card_tags_flash_card_id_tag_id_key`(`flash_card_id`, `tag_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_card_schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flash_card_id` INTEGER NOT NULL,
    `due` DATETIME(3) NOT NULL,
    `stability` DOUBLE NOT NULL,
    `difficulty` DOUBLE NOT NULL,
    `elapsed_days` INTEGER NOT NULL DEFAULT 0,
    `scheduled_days` INTEGER NOT NULL DEFAULT 0,
    `learning_steps` INTEGER NOT NULL DEFAULT 0,
    `reps` INTEGER NOT NULL DEFAULT 0,
    `lapses` INTEGER NOT NULL DEFAULT 0,
    `state` ENUM('NEW', 'LEARNING', 'REVIEW', 'RELEARNING') NOT NULL DEFAULT 'NEW',
    `last_review` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `flash_card_schedules_flash_card_id_key`(`flash_card_id`),
    INDEX `flash_card_schedules_due_idx`(`due`),
    INDEX `flash_card_schedules_state_idx`(`state`),
    INDEX `flash_card_schedules_due_state_idx`(`due`, `state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flash_card_id` INTEGER NOT NULL,
    `rating` ENUM('AGAIN', 'HARD', 'GOOD', 'EASY') NOT NULL,
    `state` ENUM('NEW', 'LEARNING', 'REVIEW', 'RELEARNING') NOT NULL,
    `due` DATETIME(3) NOT NULL,
    `stability` DOUBLE NOT NULL,
    `difficulty` DOUBLE NOT NULL,
    `elapsed_days` INTEGER NOT NULL,
    `last_elapsed_days` INTEGER NOT NULL,
    `scheduled_days` INTEGER NOT NULL,
    `learning_steps` INTEGER NOT NULL DEFAULT 0,
    `review_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `review_logs_flash_card_id_idx`(`flash_card_id`),
    INDEX `review_logs_review_date_idx`(`review_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `decks` ADD CONSTRAINT `decks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flash_cards` ADD CONSTRAINT `flash_cards_deck_id_fkey` FOREIGN KEY (`deck_id`) REFERENCES `decks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flash_card_tags` ADD CONSTRAINT `flash_card_tags_flash_card_id_fkey` FOREIGN KEY (`flash_card_id`) REFERENCES `flash_cards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flash_card_tags` ADD CONSTRAINT `flash_card_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flash_card_schedules` ADD CONSTRAINT `flash_card_schedules_flash_card_id_fkey` FOREIGN KEY (`flash_card_id`) REFERENCES `flash_cards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_logs` ADD CONSTRAINT `review_logs_flash_card_id_fkey` FOREIGN KEY (`flash_card_id`) REFERENCES `flash_cards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
