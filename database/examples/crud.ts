import { prisma } from "@/lib/prisma";

export async function createUser() {
  return prisma.user.create({
    data: {
      name: "Ada Lovelace",
      email: "ada@example.com",
    },
  });
}

export async function createDeck(userId: number) {
  return prisma.deck.create({
    data: {
      name: "English B2",
      description: "Grammar and vocabulary practice",
      userId,
    },
  });
}

export async function createFlashCard(deckId: number) {
  return prisma.flashCard.create({
    data: {
      deckId,
      front: "<p>What does <strong>whether</strong> mean?</p>",
      back: "<p>si / ya sea que</p>",
    },
  });
}

export async function createTags() {
  const tagNames = ["grammar", "phrasal-verbs", "vocabulary", "pronunciation"];

  return Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
}

export async function attachTagsToFlashCard(
  flashCardId: number,
  tagNames: string[],
) {
  return prisma.$transaction(async (tx) => {
    const attachedTags = [];

    for (const name of tagNames) {
      const tag = await tx.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      const flashCardTag = await tx.flashCardTag.upsert({
        where: {
          flashCardId_tagId: {
            flashCardId,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          flashCardId,
          tagId: tag.id,
        },
      });

      attachedTags.push(flashCardTag);
    }

    return attachedTags;
  });
}

export async function getFlashCardsByTag(tagName: string) {
  return prisma.flashCard.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: tagName,
          },
        },
      },
    },
    include: {
      deck: true,
      schedule: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFlashCardsByDeck(deckId: number) {
  return prisma.flashCard.findMany({
    where: { deckId },
    include: {
      schedule: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
