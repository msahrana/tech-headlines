"use client";
import {TCategory} from "@/app/types";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {CldUploadButton, CloudinaryUploadWidgetResults} from "next-cloudinary";
import Image from "next/image";

const CreatePostForm = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchAllCategories();
  }, []);

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
    }
  };

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({publicId}),
      });
      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const res = await fetch("/api/posts/", {
        method: "POST",
        headers: {
          "Contect-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        toast.success("Post Created Successfully!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-3">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div>
          <input
            className="px-4 py-2 border border-slate-300 rounded-md w-full"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            className="px-4 py-2 border border-slate-300 rounded-md h-36 w-full"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
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

        <div>
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            className={`w-full h-48 border-2 border-dotted grid place-items-center bg-slate-200 rounded-md relative ${
              imageUrl && "pointer-events-none"
            }`}
            onSuccess={handleImageUpload}
          >
            <div>
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>

            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                layout="fill"
                objectFit="cover"
              />
            )}
          </CldUploadButton>
        </div>

        <div>
          {publicId && (
            <button
              onClick={removeImage}
              className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4"
            >
              Remove Image
            </button>
          )}
        </div>

        <div className="border border-slate-300 rounded-md w-full">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 rounded-md border appearance-none w-full"
          >
            <option value="">Select a Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.catName}>
                  {category.catName}
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
      </form>
    </div>
  );
};

export default CreatePostForm;
