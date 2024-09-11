import { ImgCard } from "@/components/client/Card";
import { getFakeData, getImg } from "../lib/data";
import { BentoWrapperSkeletons } from "@/components/skeleton/skeletons";
import { Suspense } from "react";
import { BentoCardWrapper } from "@/components/server/Card";

export default async function Home() {
  return (
    <div className="w-full h-full bg-white pb-[90px] md:px-10 overflow-y-auto thin-scrollbar">
      <div className="w-full py-10">
        <h1 className="text-xl font-medium tracking-wide mb-10">
          Members Photo
        </h1>
        <div className="">
          <Suspense fallback={<BentoWrapperSkeletons />}>
            <BentoCardWrapper />
          </Suspense>
        </div>
        {/* <div className="border px-7 py-14 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-3">
          <Suspense fallback={<ImgCardSkeletons />}>
            <ImgCardWrapper />
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}
async function ImgCardWrapper() {
  // const imgDatas = await getImg(1, 6);
  const imgDatas = await getFakeData(12);
  return (
    <>
      {imgDatas.map((data, i) => (
        <ImgCard imgData={data} key={i} />
      ))}
    </>
  );
}
