import Image from "next/image";
import Sidenav from "@/app/ui/Sidenav";

export default function Home() {
  return (
    <div className="w-full h-full bg-sky-600 pb-[90px] px-10 overflow-y-scroll">
      <div className="grid grid-cols-3 gap-2 pt-14 md:grid-cols-4 lg:grid-cols-6 lg:gap-3">
        <div className="flex flex-col text-center gap-y-1">
          <div className=" aspect-square bg-white  border shrink-0 rounded-xl shadow-md "></div>
          <p>Joe Patterson</p>
          <p>2024</p>
        </div>
        <div className="flex flex-col text-center gap-y-1">
          <div className="aspect-square bg-white  border shrink-0 rounded-xl shadow-md "></div>
          <p>Joe Patterson</p>
          <p>2024</p>
        </div>
        <div className="flex flex-col text-center gap-y-1">
          <div className=" aspect-square bg-white  border shrink-0 rounded-xl shadow-md "></div>
          <p>Joe Patterson</p>
          <p>2024</p>
        </div>
        <div className="flex flex-col text-center gap-y-1">
          <div className=" aspect-square bg-white  border shrink-0 rounded-xl shadow-md "></div>
          <p>Joe Patterson</p>
          <p>2024</p>
        </div>
        <div className="flex flex-col text-center gap-y-1">
          <div className=" aspect-square bg-white  border shrink-0 rounded-xl shadow-md "></div>
          <p>Joe Patterson</p>
          <p>2024</p>
        </div>
        <div className="flex flex-col text-center gap-y-1">
          <div className=" aspect-square bg-white  border shrink-0 rounded-xl shadow-md "></div>
          <p>Joe Patterson</p>
          <p>2024</p>
        </div>
      </div>
    </div>
  );
}
