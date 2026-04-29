export type FounderStory = {
  id: string;
  founderName: string;
  founderRole: string;
  founderAvatarUrl?: string;
  productName: string;
  productUrl: string;
  productDescription: string;
  productScreenshotUrl?: string;
  monthOrLaunch: string;
  revenue: string;
  users: string;
  launches: string;
  biggestWin: string;
  biggestFail: string;
  biggestLesson: string;
  topChannel: string;
  nextGoal: string;
  founderQuote: string;
  createdAt: string;
};

export type StoryFilter = "All" | "Revenue" | "Launches" | "Lessons";
