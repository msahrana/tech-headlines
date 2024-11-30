import React from "react";
import Link from "next/link";
import Post from "@/components/Post";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {TPost} from "@/app/types";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const {posts} = await res.json();
    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/sign-in");
  }

  if (email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mt-3">My Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={''}
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
        <div className="py-6">
          No posts create yet ...!
          <Link className="underline" href={"/create-post"}>
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
