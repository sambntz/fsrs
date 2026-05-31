-- CreateEnum
CREATE TYPE "card_state" AS ENUM ('NEW', 'LEARNING', 'REVIEW', 'RELEARNING');

-- CreateEnum
CREATE TYPE "review_rating" AS ENUM ('AGAIN', 'HARD', 'GOOD', 'EASY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_cards" (
    "id" SERIAL NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "flash_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_card_tags" (
    "id" SERIAL NOT NULL,
    "flash_card_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "flash_card_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_card_schedules" (
    "id" SERIAL NOT NULL,
    "flash_card_id" INTEGER NOT NULL,
    "due" TIMESTAMPTZ(3) NOT NULL,
    "stability" DOUBLE PRECISION NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "elapsed_days" INTEGER NOT NULL DEFAULT 0,
    "scheduled_days" INTEGER NOT NULL DEFAULT 0,
    "learning_steps" INTEGER NOT NULL DEFAULT 0,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "state" "card_state" NOT NULL DEFAULT 'NEW',
    "last_review" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "flash_card_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_logs" (
    "id" SERIAL NOT NULL,
    "flash_card_id" INTEGER NOT NULL,
    "rating" "review_rating" NOT NULL,
    "state" "card_state" NOT NULL,
    "due" TIMESTAMPTZ(3) NOT NULL,
    "stability" DOUBLE PRECISION NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "elapsed_days" INTEGER NOT NULL,
    "last_elapsed_days" INTEGER NOT NULL,
    "scheduled_days" INTEGER NOT NULL,
    "learning_steps" INTEGER NOT NULL DEFAULT 0,
    "review_date" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "review_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "decks_user_id_idx" ON "decks"("user_id");

-- CreateIndex
CREATE INDEX "flash_cards_deck_id_idx" ON "flash_cards"("deck_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "flash_card_tags_flash_card_id_idx" ON "flash_card_tags"("flash_card_id");

-- CreateIndex
CREATE INDEX "flash_card_tags_tag_id_idx" ON "flash_card_tags"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "flash_card_tags_flash_card_id_tag_id_key" ON "flash_card_tags"("flash_card_id", "tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "flash_card_schedules_flash_card_id_key" ON "flash_card_schedules"("flash_card_id");

-- CreateIndex
CREATE INDEX "flash_card_schedules_due_idx" ON "flash_card_schedules"("due");

-- CreateIndex
CREATE INDEX "flash_card_schedules_state_idx" ON "flash_card_schedules"("state");

-- CreateIndex
CREATE INDEX "flash_card_schedules_due_state_idx" ON "flash_card_schedules"("due", "state");

-- CreateIndex
CREATE INDEX "review_logs_flash_card_id_idx" ON "review_logs"("flash_card_id");

-- CreateIndex
CREATE INDEX "review_logs_review_date_idx" ON "review_logs"("review_date");

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_cards" ADD CONSTRAINT "flash_cards_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_card_tags" ADD CONSTRAINT "flash_card_tags_flash_card_id_fkey" FOREIGN KEY ("flash_card_id") REFERENCES "flash_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_card_tags" ADD CONSTRAINT "flash_card_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flash_card_schedules" ADD CONSTRAINT "flash_card_schedules_flash_card_id_fkey" FOREIGN KEY ("flash_card_id") REFERENCES "flash_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_logs" ADD CONSTRAINT "review_logs_flash_card_id_fkey" FOREIGN KEY ("flash_card_id") REFERENCES "flash_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
