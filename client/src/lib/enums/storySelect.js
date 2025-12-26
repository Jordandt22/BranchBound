import { ListChecks, FileText, User, Users } from "lucide-react";

export const GAME_MODES = Object.freeze({
  CHOICES: { value: 1, label: "Choices", icon: ListChecks, isLocked: false },
  TEXT_BASED: { value: 2, label: "Text-based", icon: FileText, isLocked: true },
});

export const SESSION_TYPES = Object.freeze({
  SINGLEPLAYER: {
    value: 1,
    label: "Singleplayer",
    icon: User,
    isLocked: false,
  },
  MULTIPLAYER: {
    value: 2,
    label: "Multiplayer",
    icon: Users,
    isLocked: true,
  },
});

export const STORY_LENGTH_TYPES = Object.freeze({
  SHORT: { value: 1, label: "Short", subText: "10 scenes", isLocked: false },
  MEDIUM: { value: 2, label: "Medium", subText: "20 scenes", isLocked: false },
  LONG: { value: 3, label: "Long", subText: "30 scenes", isLocked: false },
  UNLIMITED: {
    value: 4,
    label: "Unlimited",
    subText: "Unlimited scenes",
    isLocked: true,
  },
});
