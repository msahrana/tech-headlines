import {TPost} from "@/app/types";
import Post from "@/components/Post";
import React from "react";

const getPosts = async (catName: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      {cache: "no-store"}
    );
    if (res.ok) {
      const categories = await res.json();
      const posts: TPost[] = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CategoryPosts = async ({
  params,
}: {
  params: {catName: string};
}): Promise<JSX.Element> => {
  const category = params.catName;
  const posts = await getPosts(category);

  return (
    <>
      <h1 className="font-bold">
        <span className="font-normal">Category: </span>{" "}
        {decodeURIComponent(category)}
      </h1>

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </>
  );
};

export default CategoryPosts;
