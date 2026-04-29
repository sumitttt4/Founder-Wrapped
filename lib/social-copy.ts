import type { FounderStory } from "@/lib/types";

export function generateXThread(story: FounderStory): string {
  const lines = [
    `1/ Here's my ${story.monthOrLaunch} update building ${story.productName}`,
    "",
    `2/ Quick context — I'm ${story.founderName}, ${story.founderRole}.`,
    `${story.productDescription}`,
    "",
    `3/ The numbers:`,
    `→ Revenue: ${story.revenue}`,
    `→ Users: ${story.users}`,
    `→ Launches: ${story.launches}`,
    `→ Top channel: ${story.topChannel}`,
    "",
    `4/ Biggest win this period:`,
    `${story.biggestWin}`,
    "",
    `5/ Biggest fail (keeping it real):`,
    `${story.biggestFail}`,
    "",
    `6/ The lesson I'm taking forward:`,
    `${story.biggestLesson}`,
    "",
    `7/ What's next → ${story.nextGoal}`,
    "",
    `8/ "${story.founderQuote}"`,
    "",
    `If you're building something too, drop it below`,
    `Made with @FounderWrapped`,
  ];
  return lines.join("\n");
}

export function generateLinkedInPost(story: FounderStory): string {
  const lines = [
    `${story.monthOrLaunch} founder update`,
    "",
    `I'm ${story.founderName}, ${story.founderRole} at ${story.productName}.`,
    `${story.productDescription}`,
    "",
    `Here's how the month went:`,
    "",
    `Revenue: ${story.revenue}`,
    `Users: ${story.users}`,
    `Launches: ${story.launches}`,
    `Top channel: ${story.topChannel}`,
    "",
    `Biggest win: ${story.biggestWin}`,
    "",
    `Biggest fail: ${story.biggestFail}`,
    "",
    `Lesson learned: ${story.biggestLesson}`,
    "",
    `Next goal: ${story.nextGoal}`,
    "",
    `"${story.founderQuote}"`,
    "",
    `Building in public because transparency builds trust.`,
    `What are you working on this month?`,
    "",
    `#buildinpublic #founderstory #startups #indiehacker`,
  ];
  return lines.join("\n");
}
