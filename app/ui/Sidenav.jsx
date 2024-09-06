"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaUser, FaTag } from "react-icons/fa";
import clsx from "clsx";

export default function Sidenav() {
  const path = usePathname();
  const iconSize = 30;
  console.log(path == "/");
  return (
    <div
      className="w-full h-20 bg-red-100 rounded-[35px] flex justify-evenly items-center fixed bottom-0 
      md:static md:w-[100px] md:rounded-none md:h-full md:flex-col md:items-center md:justify-start md:gap-y-10 md:pt-10"
    >
      <Link href={"/"} className="block w-full">
        <div className="md:flex md:justify-center md:relative md:py-1">
          <FaHome className={`w-[${iconSize}px] h-[${iconSize}px]`} />
          <span
            className={clsx("w-1 h-full bg-sky-500 absolute right-0", {
              block: path == "/",
              "hidden ": path != "/",
            })}
          ></span>
        </div>
      </Link>
      <Link href={"/tag"} className="block w-full">
        <div className="md:flex md:justify-center md:relative md:py-1">
          <FaTag className={`w-[${iconSize}px] h-[${iconSize}px]`} />
          <span
            className={clsx("w-1 h-full bg-sky-500 absolute right-0", {
              block: path == "/tag",
              "hidden ": path != "/tag",
            })}
          ></span>
        </div>
      </Link>
      <Link href={"/profile"} className="block w-full">
        <div className="md:flex md:justify-center md:relative md:py-1">
          <FaUser className={`w-[${iconSize}px] h-[${iconSize}px]`} />
          <span
            className={clsx("w-1 h-full bg-sky-500 absolute right-0", {
              block: path == "/profile",
              "hidden ": path != "/profile",
            })}
          ></span>
        </div>
      </Link>
    </div>
  );
}
