"use client";

import React from "react";
import { BadgeCheck, Flame, Shield, Shuffle } from "lucide-react";

// Utils
import { generateElementKey } from "@/lib/utils";

const statConfig = (character) => [
  {
    label: "Bold Choices",
    value: character.num_of_bold_choices,
    description: "High-risk, high-reward actions that redefine the narrative.",
    icon: Flame,
    accent: "from-red-500/20 via-red-500/10 to-red-500/2 text-red-400",
  },
  {
    label: "Neutral Choices",
    value: character.num_of_neutral_choices,
    description: "Balanced responses that keep possibilities open.",
    icon: BadgeCheck,
    accent: "from-blue-500/20 via-blue-500/10 to-blue-500/2 text-blue-400",
  },
  {
    label: "Safe Choices",
    value: character.num_of_safe_choices,
    description: "Conservative options for steady progress.",
    icon: Shield,
    accent:
      "from-emerald-500/20 via-emerald-500/10 to-emerald-500/2 text-emerald-400",
  },
  {
    label: "Wildcard Choices",
    value: character.num_of_wildcard_choices,
    description: "Unpredictable turns that surprise allies and enemies alike.",
    icon: Shuffle,
    accent:
      "from-purple-500/20 via-purple-500/10 to-purple-500/2 text-purple-400",
  },
];

const CharacterChoices = ({ character }) => {
  const stats = statConfig(character).filter(
    (stat) => stat.value !== undefined
  );

  if (stats.length === 0) {
    return null;
  }

  return (
    <aside className="space-y-8 w-full h-1/2">
      <div className="rounded-3xl border border-gray-800 bg-surface/70 p-6 shadow-card">
        <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary">
          Signature Choices
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          These are the choices that are available for this character
        </p>
      </div>

      <div className="space-y-4">
        {stats.map(({ label, value, description, icon: Icon, accent }) => (
          <div
            key={generateElementKey("character-choice-stat", label)}
            className="relative rounded-2xl p-4 group/stat group-hover/stat:scale-105 transition-all duration-300"
          >
            <div
              className={`rounded-2xl absolute inset-0 bg-linear-to-r ${accent} pointer-events-none group-hover/stat:scale-105 transition-all duration-300`}
            />
            <div className="relative z-10 flex items-start gap-4 group-hover/stat:scale-105 transition-all duration-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/40 text-white">
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-lg font-semibold text-text-primary">
                    {label}
                  </h4>
                  <span className="text-3xl font-bold text-white/80">
                    {value ?? 0}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CharacterChoices;
