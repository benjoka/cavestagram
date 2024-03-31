import { fetchStories, useStoriesQuery } from "api/stories";
import Story from "components/stories/Story";
import Participate from "components/stories/Participate";
import { useAppStore } from "stores/AppStore";
import buttonBorder from "assets/images/icons/button_border.png";
import { useEffect } from "react";
import { useQuery } from "react-query";
export default function GrottePresent() {
  const { participateMode, setParticipateMode } = useAppStore();

  const { data: stories, refetch } = useQuery("stories", fetchStories);

  const refetchStories = () => {
    refetch();
  };

  useEffect(() => {
    setTimeout(() => {
      refetchStories();
    }, 500);
  }, [participateMode]);

  const renderStories = () => {
    return (
      <div>
        <p className="text-center">
          Dies ist die Höhle der Gegenwart. An den Wänden der Höhle wird
          interaktiv verewigt, warum wir uns heute Bilder machen und diese mit
          anderen teilen.
          <br />
          <br />
          {!participateMode && (
            <button
              className="w-full max-w-[400px] caves-button"
              onClick={() => setParticipateMode("selfie")}
              style={{
                backgroundImage: `url(${buttonBorder})`,
                backgroundSize: "100% 100%",
                padding: "30px 60px",
              }}
            >
              TEILNEHMEN
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
