import React from "react";
import { postData } from "@/data";
import Post from "@/components/Post";
import Link from "next/link";

const Dashboard = () => {
  return <div>
    <h1 className="text-4xl font-bold mt-3">My Posts</h1>
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
    <div className="py-6">No posts create yet ...!
    <Link className="underline" href={'/create-post'}>Create Post</Link></div>
  )}
  </div>

};

export default Dashboard;
