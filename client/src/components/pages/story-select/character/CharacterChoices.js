import React from "react";

function CharacterChoices({ character }) {
  const {
    num_of_bold_choices,
    num_of_neutral_choices,
    num_of_safe_choices,
    num_of_wildcard_choices,
  } = character;
  const choices = [
    {
      type: "Bold",
      count: num_of_bold_choices,
    },
    {
      type: "Neutral",
      count: num_of_neutral_choices,
    },
    {
      type: "Safe",
      count: num_of_safe_choices,
    },
    {
      type: "Wildcard",
      count: num_of_wildcard_choices,
    },
  ];
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
      {choices.map((choice) => (
        <div
          key={choice.type}
          className="w-full md:w-auto flex items-center justify-center md:justify-between bg-surface-hover px-4 py-2 rounded-lg"
        >
          <p className="text-white text-base font-bold">
            {choice.count}{" "}
            <span className="text-text-primary/80 font-normal">
              {choice.type}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default CharacterChoices;
