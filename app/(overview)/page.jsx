import { ImgCardWrapper } from "@/components/Card";
import { getFakeData } from "../lib/data";

export default async function Home() {
  const imgDatas = await getFakeData();
  return (
    <div className="w-full h-full bg-sky-600 pb-[90px] px-10 overflow-y-scroll">
      <div className="grid grid-cols-3 gap-2 pt-14 md:grid-cols-4 lg:grid-cols-6 lg:gap-3">
        <ImgCardWrapper imgDatas={imgDatas} />
      </div>
    </div>
  );
}
