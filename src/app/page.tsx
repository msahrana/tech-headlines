import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import {postData} from "@/data";

export default function Home() {
  return (
    <>
      <CategoriesList />
      {postData && postData.length > 0 ? (
        postData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={"test@gmail.com"}
            date={post.publishedDate}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            content={post.content}
            links={post.link || []}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </>
  );
}
