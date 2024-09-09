import { ImgCardWrapper } from "@/components/Card";
import { getFakeData } from "../lib/data";
import { ImgCardSkeletons } from "@/components/skeleton/skeletons";
import { Suspense } from "react";

export default async function Home() {
  const imgDatas = await getFakeData();
  return (
    <div className="w-full h-full bg-white pb-[90px] px-10 overflow-y-auto thin-scrollbar">
      <div className="w-full py-10">
        <h1 className="text-xl font-medium tracking-wide mb-10">
          Members Photo
        </h1>
        <div className="border px-7 py-14 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-3">
          <Suspense fallback={<ImgCardSkeletons />}>
            <ImgCardWrapper imgDatas={imgDatas} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
