import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {TPost} from "@/app/types";
import EditPostForm from "@/components/EditPostForm";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import React from "react";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const EditPost = async ({params}: {params: {id: string}}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const id = params.id;
  const post = await getPost(id);

  return <>{post ? <EditPostForm post={post} /> : <div>Invalid Post</div>}</>;
};

export default EditPost;
