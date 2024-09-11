import { RandomNumber } from "@/app/lib/utils";

export function ImgCardSkeletons() {
  return (
    <>
      <ImgCardSkeleton />
      <ImgCardSkeleton />
      <ImgCardSkeleton />
      <ImgCardSkeleton />
      <ImgCardSkeleton />
      <ImgCardSkeleton />
      <ImgCardSkeleton />
    </>
  );
}
export function ImgCardSkeleton() {
  return (
    <div className="flex flex-col text-center gap-y-1 group">
      <div className="relative w-full h-0 pb-[100%] bg-slate-300 border shrink-0 shadow-md mb-2 cursor-pointer shimmer"></div>
      <div className="flex flex-col items-center gap-y-2">
        <p className="font-medium tracking-wide w-[100px] h-[30px] bg-slate-300 shimmer"></p>
      </div>
    </div>
  );
}
export function BentoImgSkeleton() {
  const height = RandomNumber(300, 500);
  return (
    <div
      className={`w-full h-[500px] bg-slate-300 shimmer`}
      style={{ height: height }}
    ></div>
  );
}
export function BentoWrapperSkeletons() {
  return (
    <div className="w-full h-screen grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex-1 flex flex-col gap-y-3">
        <BentoImgSkeleton />
        <BentoImgSkeleton />
        <BentoImgSkeleton />
      </div>
      <div className="flex-1 flex flex-col gap-y-3">
        <BentoImgSkeleton />
        <BentoImgSkeleton />
        <BentoImgSkeleton />
      </div>
      <div className="flex-1 flex flex-col gap-y-3">
        <BentoImgSkeleton />
        <BentoImgSkeleton />
        <BentoImgSkeleton />
      </div>
    </div>
  );
}
