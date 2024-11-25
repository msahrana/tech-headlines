"use client";
import React from "react";
import Image from "next/image";
import {signIn} from "next-auth/react";

const SignInButtons = () => {
  return (
    <>
      <h1 className="text-center my-8 text-4xl font-bold">Sign In</h1>
      <div className="flex flex-col p-4 items-center justify-center gap-4">
        <button
          onClick={() => signIn("github")}
          className="flex items-center p-4 border rounded-full gap-4 hover:bg-slate-200/25 transition"
        >
          <span>
            <Image
              src={"/github-logo.svg"}
              width={30}
              height={30}
              alt="Github Logo"
            />
          </span>
          Sign In With Github
        </button>

        <button
          onClick={() => signIn("google")}
          className="flex items-center p-4 border rounded-full gap-4 hover:bg-slate-200/25 transition"
        >
          <span>
            <Image
              src={"/google-logo.svg"}
              width={30}
              height={30}
              alt="Google Logo"
            />
          </span>
          Sign In With Google
        </button>
      </div>
    </>
  );
};

export default SignInButtons;
