import { useStoriesQuery } from "api/stories";
import Story from "components/stories/Story";
import { useEffect } from "react";

export default function GrottePresent() {
  const { data: stories } = useStoriesQuery();

  return (
    <div>
      <h1>La Grotte du Présent</h1>
      <p className="text-justify">
        Dies ist die Höhle der Gegenwart. An den Wänden der Höhle wird
        interaktiv verewigt, warum wir uns heute Bilder machen und diese mit
        anderen teilen.
        <br />
        <br />
        Warum machst du dir Bilder?
      </p>
      {stories?.map((story) => {
        return (
          <Story
            key={`story_${story.id}`}
            id={story.id}
            media={story.media}
            selfie={story.selfie}
          />
        );
      })}
    </div>
  );
}
