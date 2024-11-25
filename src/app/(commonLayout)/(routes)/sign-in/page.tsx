import React from "react";
import SignInButtons from "@/components/SignInButtons";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

// eslint-disable-next-line @next/next/no-async-client-component
const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <SignInButtons />;
};

export default SignIn;
