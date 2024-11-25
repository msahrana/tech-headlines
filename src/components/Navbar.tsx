import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between pb-4 border-b ">
      <div>
        <Link href={"/"}>
          <h1 className="text-2xl md:text-4xl font-bold text-dark tracking-tighter">Tech Headlines</h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Innovations, <br /> One Byte at a Time.
        </p>
      </div>
      <div className="flex items-center">
        <Link className="btn border p-2 rounded hover:bg-dark hover:text-white" href={"/sign-in"}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
