import { fetchStories, useStoriesQuery } from "api/stories";
import Story from "components/stories/Story";
import Participate from "components/stories/Participate";
import { useAppStore } from "stores/AppStore";
import buttonBorder from "assets/images/icons/button_border.png";
import { useEffect, useState } from "react";

export default function GrottePresent() {
  const {
    grottePresentIntroPlayed,
    setGrottePresentIntroPlayed,
    stories,
    setStories,
    participateMode,
    setParticipateMode,
    voicePresentAudio,
    voicePasseAudio,
  } = useAppStore();

  useEffect(() => {
    if (!grottePresentIntroPlayed) {
      setGrottePresentIntroPlayed(true);
      if (voicePresentAudio) {
        setTimeout(() => {
          voicePresentAudio.play();
        }, 1000);
      }
    }
    if (voicePasseAudio) {
      voicePasseAudio.pause();
    }
  }, []);

  const { data: storyResponse } = useStoriesQuery();

  useEffect(() => {
    if (storyResponse && stories.length === 0) {
      setStories(storyResponse);
    }
  }, [storyResponse]);

  const renderStories = () => {
    return (
      <div>
        <div className="w-full flex justify-center">
          <p className="text-center w-full md:w-1/2">
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
        </div>

        <div className="w-full h-full flex flex-wrap items-center justify-center">
          {stories?.map((story, index) => {
            return (
              <div
                className="w-full md:w-1/3 md:px-[50px] my-[20px]"
                key={index}
              >
                <Story
                  key={`story_${story.id}`}
                  id={story.id}
                  media={story.media}
                  selfie={story.selfie}
                />
              </div>
            );
          })}
        </div>
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
    <div className="h-full animate-pulse-soft">
      {!participateMode && renderStories()}
      {participateMode && renderParticipate()}
    </div>
  );
}
