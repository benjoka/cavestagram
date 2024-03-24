import { useStoriesQuery } from "api/stories";
import Story from "components/stories/Story";
import Participate from "components/stories/Participate";
import { useAppStore } from "stores/AppStore";

export default function GrottePresent() {
  const { data: stories } = useStoriesQuery();
  const { participateMode, setParticipateMode } = useAppStore();
  const renderStories = () => {
    return (
      <div>
        <p className="text-justify">
          Dies ist die Höhle der Gegenwart. An den Wänden der Höhle wird
          interaktiv verewigt, warum wir uns heute Bilder machen und diese mit
          anderen teilen.
          <br />
          <br />
          {!participateMode && (
            <button onClick={() => setParticipateMode("selfie")}>
              Darum mache ich mir Bilder
            </button>
          )}
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
  };
  const renderParticipate = () => {
    return (
      <div className="h-full flex flex-col">
        <Participate></Participate>
      </div>
    );
  };
  return (
    <div className="h-full">
      {!participateMode && renderStories()}
      {participateMode && renderParticipate()}
    </div>
  );
}
