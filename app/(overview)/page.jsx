import { ImgCard } from "@/components/client/Card";
import { getFakeData, getImg } from "../lib/data";
import { ImgCardSkeletons } from "@/components/skeleton/skeletons";
import { Suspense } from "react";
import Image from "next/image";
import { BentoCardWrapper } from "@/components/server/Card";
import { allBlurredDataUrls } from "../lib/utils";

export default async function Home() {
  const fakeData1 = await allBlurredDataUrls(await getFakeData(5));
  const fakeData2 = await allBlurredDataUrls(await getFakeData(5));
  const fakeData3 = await allBlurredDataUrls(await getFakeData(5));
  console.log(fakeData1);

  return (
    <div className="w-full h-full bg-white pb-[90px] md:px-10 overflow-y-auto thin-scrollbar">
      <div className="w-full py-10">
        <h1 className="text-xl font-medium tracking-wide mb-10 mx-10">
          Members Photo
        </h1>
        <div className="">
          <div className="w-full h-screen grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex-1 flex flex-col gap-y-3">
              <BentoCardWrapper arr={fakeData1} />
            </div>
            <div className="flex-1 flex flex-col gap-y-3">
              <BentoCardWrapper arr={fakeData2} />
            </div>
            <div className="flex-1 flex flex-col gap-y-3">
              <BentoCardWrapper arr={fakeData3} />
            </div>
          </div>
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
