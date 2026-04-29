import type { FounderStory } from "@/lib/types";

export function generateXThread(story: FounderStory): string {
  return `1/ I built ${story.productName} and here’s what happened in ${story.monthOrLaunch}\n\n2/ Results: ${story.revenue} revenue and ${story.users} users.\n\n3/ Biggest win: ${story.biggestWin}\n\n4/ Biggest fail: ${story.biggestFail}\n\n5/ Lesson learned: ${story.biggestLesson}\n\n6/ Next goal: ${story.nextGoal}\n\n7/ What are you building this month?`;
}

export function generateLinkedInPost(story: FounderStory): string {
  return `Founder update from ${story.monthOrLaunch}:\n\nI’m ${story.founderName}, ${story.founderRole} at ${story.productName}.\n${story.productDescription}\n\nThis period: ${story.revenue} revenue, ${story.users} users, ${story.launches} launches.\n\nBiggest win: ${story.biggestWin}\nBiggest fail: ${story.biggestFail}\nLesson learned: ${story.biggestLesson}\n\nNext, I’m focused on: ${story.nextGoal}\n\n“${story.founderQuote}”\n\nBuilding in public keeps me honest and connected. What are you building this month?`;
}
