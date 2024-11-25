import CreatePostForm from "@/components/CreatePostForm";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import React from "react";

const CreatePost = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return <CreatePostForm />;
};

export default CreatePost;
