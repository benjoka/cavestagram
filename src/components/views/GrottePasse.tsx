import { usePostsQuery } from "api/posts";
import Post from "components/posts/Post";
export default function GrottePasse() {
  const { data: posts } = usePostsQuery();
  return (
    <div>
      <h1>La Grotte du Passé</h1>
      <p className="text-justify">
        Du befindest dich in der Höhle der Vergangenheit. Die Höhlenwände
        erzählen von der paläolithischen Höhlenmalerei und beschäftigen sich mit
        der Frage, wieso sich die Menschen damals nicht nur Bilder gemacht,
        sondern diese auch, in Form von Höhlenmalereien, mit ihren Mitmenschen
        geteilt haben.
      </p>
      {posts?.map((post) => {
        return (
          <Post
            key={`post_${post.id}`}
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
