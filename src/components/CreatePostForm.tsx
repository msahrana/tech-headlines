"use client";
import {categoriesData} from "@/data";
import Link from "next/link";
import React, {useState} from "react";

const CreatePostForm = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index:number)=>{
    setLinks((prev)=> prev.filter((_, i)=>i !== index))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold my-3">Create Post</h1>
      <form className="flex flex-col gap-3 w-full">
        <div>
          <input
            className="px-4 py-2 border border-slate-300 rounded-md w-full"
            type="text"
            name="title"
            placeholder="Title"
          />
        </div>

        <div>
          <textarea
            className="px-4 py-2 border border-slate-300 rounded-md h-36 w-full"
            name="content"
            placeholder="Content"
          ></textarea>
        </div>

        <div>
          {links &&
            links.map((link, index) => (
              <div className="flex gap-5 items-center" key={index}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                  </svg>
                </span>
                <Link className="text-[#7563DF] font-bold" href={link}>
                  {link}
                </Link>
                <span
                  className="cursor-pointer"
                  onClick={() => deleteLink(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            name=""
            placeholder="Paste the link and click add button"
            className="px-4 py-2 border border-slate-300 rounded-md w-2/3 md:w-5/6"
            onChange={(e) => setLinkInput(e.target.value)}
            value={linkInput}
          />
          <button
            onClick={addLink}
            className="btn flex gap-2 items-center bg-slate-800 text-white px-4 py-2 rounded-md w-1/3 md:w-1/6"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </span>
            Add
          </button>
        </div>

        <div className="border border-slate-300 rounded-md w-full">
          <select className="p-3 rounded-md border appearance-none w-full">
            <option value="">Select a Category</option>
            {categoriesData &&
              categoriesData.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <button
            className="w-full bg-slate-800 px-4 py-2 text-white rounded-md"
            type="submit"
          >
            Create Post
          </button>
        </div>

        <div className="text-red-500 p-2 font-bold text-xl">Error Message</div>
      </form>
    </div>
  );
};

export default CreatePostForm;
