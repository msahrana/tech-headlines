import React from "react";
import {categoriesData} from "@/data";
import Link from "next/link";

const CategoriesList = () => {
  return (
    <div className="flex flex-wrap gap-3 text-sm my-3">
      {categoriesData &&
        categoriesData.map((category) => (
          <Link
            className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
            key={category.id}
            href={`/categories/${category.name}`}
          >
            {category.name}
          </Link>
        ))}
    </div>
  );
};

export default CategoriesList;
