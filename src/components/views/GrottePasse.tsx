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
      setGrottePasseeIntroPlayed(true);
      if (voicePasseAudio) {
        voicePasseAudio.play();
      }
    }
    if (voicePresentAudio) {
      voicePresentAudio.pause();
    }
  }, [cavePasseeEntered]);

  return (
    <div>
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
    </div>
  );
}
