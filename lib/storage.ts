import type { FounderStory } from "@/lib/types";

const KEY = "founderwrapped:stories";

function readStories(): FounderStory[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as FounderStory[]; } catch { return []; }
}

function writeStories(stories: FounderStory[]) {
  localStorage.setItem(KEY, JSON.stringify(stories));
}

export function saveStory(story: FounderStory): void {
  const stories = readStories().filter((s) => s.id !== story.id);
  stories.unshift(story);
  writeStories(stories);
}

export function getStory(id: string): FounderStory | null {
  return readStories().find((s) => s.id === id) ?? null;
}

export function getAllStories(): FounderStory[] {
  return readStories();
}

export function seedSampleStories(): void {
  if (typeof window === "undefined") return;
  if (readStories().length) return;
  const base: FounderStory[] = [
    ["Alex Chen","Solo founder","Luna","$10k MRR","2,843","2","Product Hunt","Ship weekly, learn daily."],
    ["Sofia Garcia","Maker of Flowly","Flowly","$18.2k ARR","3,100","6","X / Twitter","Niche wins over broad."],
    ["Maya Patel","Indie maker","PingPilot","$4.2k MRR","1,120","3","Reddit","Keep onboarding simple."],
    ["Tom Alvarez","Bootstrap founder","Byteboard","$7.5k MRR","2,010","1","Newsletter","Consistency compounds."],
    ["Lena Müller","SaaS founder","Loopdesk","$2.8k MRR","980","2","LinkedIn","Talk to users weekly."],
    ["Noah Reed","AI tool builder","DraftMate","$5.1k MRR","1,440","4","YouTube","Show, don't tell."],
  ].map((x, i) => ({
    id: `sample-${i + 1}`,
    founderName: x[0], founderRole: x[1], productName: x[2], productUrl: "https://example.com",
    productDescription: `Building ${x[2]} in public for focused teams.`, monthOrLaunch: "March 2026", revenue: x[3], users: x[4], launches: x[5],
    biggestWin: "Hit best conversion week after onboarding improvements.", biggestFail: "Overbuilt a feature nobody requested.", biggestLesson: "Talk to users before shipping complex work.",
    topChannel: x[6], nextGoal: "Reach consistent weekly activation growth.", founderQuote: x[7], createdAt: new Date().toISOString(),
    founderAvatarUrl: "", productScreenshotUrl: ""
  }));
  writeStories(base);
}
