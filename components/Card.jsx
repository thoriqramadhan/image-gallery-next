"use client";
import { FormatDate } from "@/app/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";

import clsx from "clsx";

export function ImgCardWrapper({ imgDatas }) {
  return (
    <>
      {imgDatas.map((data, i) => (
        <ImgCard imgData={data} key={i} />
      ))}
    </>
  );
}
export function ImgCard({ imgData }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { created_at, alt_description, urls, user } = imgData;
  const date = FormatDate(created_at);
  function handler() {
    setIsFavourite(!isFavourite);
    console.log(isFavourite);
  }
  return (
    <div className="flex flex-col text-center gap-y-1 group">
      <div className="relative w-full h-0 pb-[100%] bg-white overflow-hidden border shrink-0 shadow-md mb-2 cursor-pointer">
        <div
          className="w-full h-full bg-black/60 absolute z-30 hidden group-hover:flex p-2 sm:flex-col"
          onClick={handler}
        >
          <div className="w-full flex justify-end">
            <CiStar
              className={clsx("text-[#FFF629] text-3xl", {
                "text-red-500": isFavourite,
              })}
              fill="#FFF629"
            />
          </div>
          <div className="flex-1 text-white overflow-y-scroll text-sm text-left mt-10 thin-scrollbar">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
            molestias quas asperiores voluptatum esse voluptatibus accusamus
            veniam libero alias id! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Officia, soluta.
          </div>
        </div>
        <Image
          src={urls.regular}
          alt={alt_description}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <p className="font-medium tracking-wide">{user.name}</p>
      <p className="text-sm text-[#B8B9BA]">{date}</p>
    </div>
  );
}
