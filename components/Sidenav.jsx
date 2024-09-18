"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaUser, FaTag } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export default function Sidenav() {
  const path = usePathname();
  const iconSize = 30;
  const defaultQuery = "?page=1&per_page=12";
  const iconObj = [
    {
      href: `/${defaultQuery}`,
      icon: React.cloneElement(<FaHome />),
      size: 30,
    },
    {
      href: `/tag`,
      icon: React.cloneElement(<FaTag />),
      size: 27,
    },
    {
      href: "/profile",
      icon: React.cloneElement(<FaUser />),
      another: ({ ...props }) => <FaUser {...props} />,
      size: 26,
    },
  ];
  return (
    <div className="w-full z-50 flex justify-center pb-5 fixed bottom-0 group md:w-[80px]  md:h-full md:pb-0 md:shrink-0 md:bottom-auto md:left-0">
      <div
        className="w-[85%] h-20 bg-white border shadow-md rounded-[35px] flex justify-evenly items-center transition-300 translate-y-[100px] group-hover:translate-y-0 md:translate-y-0 
       md:rounded-none md:h-full md:flex-col md:items-center md:justify-start md:gap-y-10 md:pt-10 md:w-full"
      >
        {iconObj.map((icon, index) => (
          <Link href={icon.href} className="block md:w-full" key={icon.href}>
            <div
              className={twMerge(
                clsx(
                  "md:flex md:w-full md:justify-center md:relative p-2 rounded-full md:py-1 md:border-r-2 md:border-transparent md:rounded-none",
                  {
                    "bg-sky-500 md:bg-transparent md:border-sky-500":
                      path === icon.href ||
                      (path !== "/tag" && path !== "/profile" && index === 0),
                  }
                )
              )}
            >
              {React.cloneElement(icon.icon, {
                style: {
                  width: `${icon.size}px`,
                  height: `${icon.size}px`,
                },
                className: clsx("z-30 relative md:text-black", {
                  "text-white":
                    path === icon.href ||
                    (path !== "/tag" && path !== "/profile" && index === 0),
                }),
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
