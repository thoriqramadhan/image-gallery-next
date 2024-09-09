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
  const iconObj = [
    {
      href: "/",
      icon: React.cloneElement(<FaHome />),
      size: 30,
    },
    {
      href: "/tag",
      icon: React.cloneElement(<FaTag />),
      size: 27,
    },
    {
      href: "/profile",
      icon: React.cloneElement(<FaUser />),
      size: 26,
    },
  ];
  return (
    <div className="w-full flex justify-center pb-10 fixed bottom-0 md:w-[80px] md:static ">
      <div
        className="w-[85%] h-20 bg-white border rounded-[35px] flex justify-evenly items-center mb-5
       md:rounded-none md:h-full md:flex-col md:items-center md:justify-start md:gap-y-10 md:pt-10 md:w-full"
      >
        {iconObj.map((icon) => (
          <Link href={icon.href} className="block md:w-full" key={icon.href}>
            <div className="relative md:flex md:w-full md:justify-center md:relative md:py-1">
              {React.cloneElement(icon.icon, {
                style: {
                  width: `${icon.size}px`,
                  height: `${icon.size}px`,
                },
                className: clsx("z-30 relative md:text-black", {
                  "text-white": path === icon.href,
                }),
              })}
              <span
                className={clsx(
                  "w-[45px] h-[45px] rounded-full -left-[7px] -top-[6px] md:w-1 md:h-full bg-sky-500 absolute md:right-0 md:left-auto md:top-auto",
                  {
                    block: path == icon.href,
                    "hidden ": path != icon.href,
                  }
                )}
              ></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
