import { usePostsQuery } from "api/posts";
import Post from "components/posts/Post";
import { useEffect } from "react";
import { useAppStore } from "stores/AppStore";

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
    <div className="animate-pulse-soft">
      <p className="text-center">
        Du befindest dich in der Höhle der Vergangenheit. Die Höhlenwände
        erzählen von der paläolithischen Höhlenmalerei und beschäftigen sich mit
        der Frage, wieso sich die Menschen damals nicht nur Bilder gemacht,
        sondern diese auch, in Form von Höhlenmalereien, mit ihren Mitmenschen
        geteilt haben.
      </p>
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
          ></Post>
        );
      })}
      <div className="w-full flex justify-end pb-[50px]">
        <h2 className="rotate-[-10deg] text-[12px] leading-[13px] text-center opacity-30">
          03 | 12
        </h2>
      </div>
    </div>
  );
}
