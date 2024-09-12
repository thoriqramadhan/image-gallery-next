import React from "react";
import { GiTravelDress } from "react-icons/gi";
import {
  MdOutlineTravelExplore,
  MdAddAPhoto,
  MdSportsMartialArts,
} from "react-icons/md";
import { FaFilm, FaTree } from "react-icons/fa6";
import { BsBadge3dFill } from "react-icons/bs";
import { SiAnimalplanet } from "react-icons/si";
import Link from "next/link";

const categories = [
  {
    title: "Fashion",
    slug: "fashion-beauty",
    icon: <GiTravelDress />,
  },
  {
    title: "Travel",
    slug: "travel",
    icon: <MdOutlineTravelExplore />,
  },
  {
    title: "Photography",
    slug: "street-photography",
    icon: <MdAddAPhoto />,
  },
  {
    title: "Film",
    slug: "film",
    icon: <FaFilm />,
  },
  {
    title: "Nature",
    slug: "nature",
    icon: <FaTree />,
  },
  {
    title: "Sport",
    slug: "sport",
    icon: <MdSportsMartialArts />,
  },
  {
    title: "3D",
    slug: "3d-renders",
    icon: <BsBadge3dFill />,
  },
  {
    title: "Animal",
    slug: "Animal",
    icon: <SiAnimalplanet />,
  },
];

export default function page() {
  return (
    <div className="w-full h-screen px-10 py-10">
      <h1 className="text-subheading">Categories</h1>
      <div className="w-full grid grid-cols-2 gap-3 mt-5 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            className="aspect-[12/9] border rounded-xl flex flex-col justify-center px-5"
            key={category.slug}
            href={`/tag/${category.slug}`}
          >
            {React.cloneElement(category.icon, {
              className: "text-5xl mb-1",
            })}
            <p className="text-xl font-medium tracking-wide sm:text-2xl sm:mt-3">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
