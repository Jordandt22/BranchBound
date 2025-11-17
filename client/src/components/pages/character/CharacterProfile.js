"use client";

import React, { useMemo } from "react";

// Utils
import { generateElementKey } from "@/lib/utils";

// Components
import CharacterGroupInfo from "@/components/pages/character/CharacterGroupInfo";
import AdjustableTextBox from "@/components/layout/AdjustableTextBox";

const infoSections = [
  {
    key: "conflicts",
    title: "Core Conflicts",
    accessor: (character) => character.conflicts,
  },
  {
    key: "dilemmas",
    title: "Core Dilemmas",
    accessor: (character) => character.dilemmas,
  },
];

const CharacterProfile = ({ character }) => {
  const sections = useMemo(
    () =>
      infoSections.map(({ key, title, accessor }) => {
        const content = accessor(character);
        return { key, title, content };
      }),
    [character]
  );

  return (
    <div className="md:col-span-2 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        {sections.map(({ key, title, content }) => (
          <AdjustableTextBox
            key={generateElementKey("character-profile-section", key)}
            title={title}
            content={content}
            containerClass="w-full md:w-1/2"
          />
        ))}
      </div>
      <CharacterGroupInfo character={character} />
    </div>
  );
};

export default CharacterProfile;
