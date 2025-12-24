import React from "react";

async function SelectCharactersPage({ params }) {
  const { user_story_id } = await params;

  return <div>{user_story_id}</div>;
}

export default SelectCharactersPage;
