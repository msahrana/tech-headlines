import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteButton from "./DeleteButton";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

interface IPostProps {
  id: string;
  author: string;
  authorEmail?: string;
  date: string;
  thumbnail?: string;
  category?: string;
  title: string;
  content: string;
  links?: string[];
}

const Post = async ({
  id,
  author,
  authorEmail,
  date,
  thumbnail,
  category,
  title,
  content,
  links,
}: IPostProps) => {
  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === authorEmail;

  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const dateFormate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className="my-4 border-b border-b-300 py-8">
      <div className="mb-2">
        {author ? (
          <>
            Posted By: <span className="font-bold">{author},</span> on{" "}
            {dateFormate}
          </>
        ) : (
          <>Posted on {dateFormate}</>
        )}
      </div>

      <div className="w-full h-60 relative mt-1">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover object-center rounded-md"
          />
        ) : (
          <Image
            src={"/thumbnail-placeholder.png"}
            alt={title}
            fill
            className="object-cover object-center rounded-md"
          />
        )}
      </div>

      <div>
        {category && (
          <Link
            className="bg-slate-800 w-fit text-white px-4 py-1 text-sm font-bold rounded mt-4 block"
            href={`/categories/${category}`}
          >
            {category}
          </Link>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold my-3">{title}</h2>
        <p className="text-justify">{content}</p>
      </div>

      <div>
        {links && (
          <div className="my-4 flex flex-col gap-3">
            {links.map((link, index) => (
              <div key={index} className="flex gap-3 items-center">
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
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>

                <Link
                  className="text-[#7563DF] font-semibold max-w-full overflow-hidden text-ellipsis"
                  href={link}
                >
                  {link}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {isEditable && (
          <div className="flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit">
            <Link href={`/edit-post/${id}`}>Edit</Link>
            <DeleteButton id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
