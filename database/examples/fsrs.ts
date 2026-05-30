import {
  createEmptyCard,
  fsrs,
  Rating,
  State,
  type Card,
  type Grade,
} from "ts-fsrs";
import { CardState, ReviewRating } from "@/database/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

const scheduler = fsrs();

const cardStateByFsrsState: Record<State, CardState> = {
  [State.New]: CardState.NEW,
  [State.Learning]: CardState.LEARNING,
  [State.Review]: CardState.REVIEW,
  [State.Relearning]: CardState.RELEARNING,
};

const reviewRatingByFsrsRating: Record<Grade, ReviewRating> = {
  [Rating.Again]: ReviewRating.AGAIN,
  [Rating.Hard]: ReviewRating.HARD,
  [Rating.Good]: ReviewRating.GOOD,
  [Rating.Easy]: ReviewRating.EASY,
};

export async function createNewFlashCardWithSchedule(deckId: number) {
  const fsrsCard = createEmptyCard(new Date());

  return prisma.flashCard.create({
    data: {
      deckId,
      front: "<p>What is a phrasal verb?</p>",
      back: "<p>A verb plus particle that creates a new meaning.</p>",
      schedule: {
        create: mapFsrsCardToScheduleCreate(fsrsCard),
      },
    },
    include: {
      schedule: true,
    },
  });
}

export async function reviewFlashCard(
  flashCardId: number,
  rating: Grade,
  reviewDate = new Date(),
) {
  return prisma.$transaction(async (tx) => {
    const currentSchedule = await tx.flashCardSchedule.findUniqueOrThrow({
      where: { flashCardId },
    });

    const currentCard = mapScheduleToFsrsCard(currentSchedule);
    const result = scheduler.next(currentCard, reviewDate, rating);

    await tx.reviewLog.create({
      data: {
        flashCardId,
        rating: reviewRatingByFsrsRating[rating],
        state: cardStateByFsrsState[result.log.state],
        due: result.log.due,
        stability: result.log.stability,
        difficulty: result.log.difficulty,
        elapsedDays: result.log.elapsed_days,
        lastElapsedDays: result.log.last_elapsed_days,
        scheduledDays: result.log.scheduled_days,
        learningSteps: result.log.learning_steps,
        reviewDate: result.log.review,
      },
    });

    return tx.flashCardSchedule.update({
      where: { flashCardId },
      data: mapFsrsCardToScheduleUpdate(result.card),
    });
  });
}

function mapFsrsCardToScheduleCreate(card: Card) {
  return {
    due: card.due,
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: cardStateByFsrsState[card.state],
    lastReview: card.last_review ?? null,
  };
}

function mapFsrsCardToScheduleUpdate(card: Card) {
  return mapFsrsCardToScheduleCreate(card);
}

function mapScheduleToFsrsCard(schedule: {
  due: Date;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  state: CardState;
  lastReview: Date | null;
}): Card {
  return {
    due: schedule.due,
    stability: schedule.stability,
    difficulty: schedule.difficulty,
    elapsed_days: schedule.elapsedDays,
    scheduled_days: schedule.scheduledDays,
    learning_steps: schedule.learningSteps,
    reps: schedule.reps,
    lapses: schedule.lapses,
    state: mapPrismaCardStateToFsrsState(schedule.state),
    last_review: schedule.lastReview ?? undefined,
  };
}

function mapPrismaCardStateToFsrsState(state: CardState) {
  switch (state) {
    case CardState.NEW:
      return State.New;
    case CardState.LEARNING:
      return State.Learning;
    case CardState.REVIEW:
      return State.Review;
    case CardState.RELEARNING:
      return State.Relearning;
  }
}
