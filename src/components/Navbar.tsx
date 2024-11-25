"use client";
import {useSession, signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";

const Navbar = () => {
  const {status, data: session} = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    

    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="flex justify-between pb-4 border-b relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-2xl md:text-4xl font-bold text-dark tracking-tighter">
            Tech Headlines
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Innovations, <br /> One Byte at a Time.
        </p>
      </div>

      {status === "authenticated" ? (
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px] items-end ${
              isPopupVisible ? "flex" : "hidden"
            }`}
          >
            <div className="font-bold">{session?.user?.name}</div>

            <div>{session?.user?.email}</div>

            <Link
              onClick={() => setIsPopupVisible(false)}
              className="hover:underline hover:text-[#7563DF]"
              href={"/dashboard"}
            >
              Dashboard
            </Link>

            <Link
              onClick={() => setIsPopupVisible(false)}
              className="hover:underline hover:text-[#7563DF]"
              href={"/create-post"}
            >
              Create Post
            </Link>

            <button
              onClick={() => signOut()}
              className="btn bg-slate-300 px-4 py-2 rounded-md font-semibold"
            >
              Sign Out
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Link
              className="bg-slate-300 px-4 py-2 rounded hidden md:flex gap-2"
              href={"/create-post"}
            >
              <span className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>Create New</span>
              </span>
            </Link>
            <Image
              className="w-10 h-10 rounded-full cursor-pointer"
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
              onClick={() => setIsPopupVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link
            className="btn border p-2 rounded hover:bg-dark hover:text-white"
            href={"/sign-in"}
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
