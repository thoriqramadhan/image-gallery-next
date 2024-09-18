import { ImgCard } from "@/components/client/Card";
import { getFakeData, getImg } from "../lib/data";
import { BentoWrapperSkeletons } from "@/components/skeleton/skeletons";
import { Suspense } from "react";
import { BentoCardWrapper } from "@/components/server/Card";
import Search from "@/components/client/Search";

export default async function Home({ searchParams }) {
  const searchQuery = searchParams.search || "";
  const page = searchParams.page || 1;
  const limit = searchParams.per_page || 1;
  return (
    <div className="w-full h-full bg-white pb-[90px] md:px-10 overflow-y-auto thin-scrollbar md:ml-[80px]">
      <div className="w-full py-10">
        <div className="w-full flex justify-between">
          <h1 className="text-xl font-medium tracking-wide mb-10">
            Members Photo {searchQuery}
          </h1>
          <Search />
        </div>
        <div className="">
          <Suspense fallback={<BentoWrapperSkeletons />}>
            <BentoCardWrapper query={{ searchQuery, page, limit }} />
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
