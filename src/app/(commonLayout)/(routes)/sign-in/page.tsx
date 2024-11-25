import Image from "next/image";
import React from "react";

const SignIn = () => {
  return (
    <>
      <h1 className="text-center my-8 text-4xl font-bold">Sign In</h1>
      <div className="flex flex-col p-4 items-center justify-center gap-4">
        <button className="flex items-center p-4 border rounded-full gap-4 hover:bg-slate-200/25 transition">
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

        <button className="flex items-center p-4 border rounded-full gap-4 hover:bg-slate-200/25 transition">
          <span>
            <Image
              src={"/google-logo.svg"}
              width={30}
              height={30}
              alt="Github Logo"
            />
          </span>
          Sign In With Google
        </button>
      </div>
    </>
  );
};

export default SignIn;
