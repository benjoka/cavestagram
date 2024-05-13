import { usePostsQuery } from "api/posts";
import Post from "components/posts/Post";
import { useEffect } from "react";
import { useAppStore } from "stores/AppStore";

import Birdman from "assets/images/paintings/birdman.png";
import Reindeers from "assets/images/paintings/reindeers_font_de_gaumes.png";
import Deer from "assets/images/paintings/deer.png";
import Bull from "assets/images/paintings/bull.png";
import Unicorn from "assets/images/paintings/unicorn.png";

const paintings = [Birdman, Reindeers, Deer, Bull, Unicorn];

export default function GrottePasse() {
  const { data: posts } = usePostsQuery();
  const {
    grottePasseeIntroPlayed,
    cavePasseeEntered,
    setGrottePasseeIntroPlayed,
    voicePasseAudio,
    voicePresentAudio,
  } = useAppStore();
  useEffect(() => {
    if (!grottePasseeIntroPlayed && cavePasseeEntered) {
      if (voicePasseAudio) {
        voicePasseAudio.play();
        setGrottePasseeIntroPlayed(true);
      }
    }
    if (voicePresentAudio) {
      voicePresentAudio.pause();
    }
  }, [cavePasseeEntered]);

  return (
    <div>
      <div className="w-full flex justify-center">
        <p className="text-center w-full md:w-1/2">
          Du befindest dich in der Höhle der Vergangenheit. Die Höhlenwände
          erzählen von der paläolithischen Höhlenmalerei und beschäftigen sich
          mit der Frage, wieso sich die Menschen damals nicht nur Bilder
          gemacht, sondern diese auch, in Form von Höhlenmalereien, mit ihren
          Mitmenschen geteilt haben.
        </p>
      </div>
      {posts?.map((post, index) => {
        return (
          <Post
            key={`post_${post.id}`}
            reverse={index % 2 !== 0 ? true : false}
            id={post.id}
            text={post.text}
            title={post.title}
            location={post.location}
            references={post.references}
            media={post.media}
            painting={
              paintings.length > index
                ? paintings[index]
                : paintings[index - paintings.length]
            }
          ></Post>
        );
      })}
    </div>
  );
}
