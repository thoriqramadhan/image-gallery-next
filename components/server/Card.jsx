import Image from "next/image";
import { allBlurredDataUrls, getBase64, RandomNumber } from "@/app/lib/utils";
import Link from "next/link";
import { getFakeData } from "@/app/lib/data";

export async function BentoCardWrapper() {
  const fakeData1 = await allBlurredDataUrls(await getFakeData(5));
  const fakeData2 = await allBlurredDataUrls(await getFakeData(5));
  const fakeData3 = await allBlurredDataUrls(await getFakeData(5));
  return (
    <>
      <div className="w-full h-screen grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex-1 flex flex-col gap-y-3">
          {fakeData1.map((item) => (
            <BentoCardItem url={item.urls} id={item.id} key={item.id} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-y-3">
          {fakeData2.map((item) => (
            <BentoCardItem url={item.urls} id={item.id} key={item.id} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-y-3">
          {fakeData3.map((item) => (
            <BentoCardItem url={item.urls} id={item.id} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}
export async function BentoCardItem({ url, id }) {
  return (
    <Link className="w-full h-auto relative group" href={`/${id}/detail`}>
      <Image
        src={`${url.regular}`}
        alt="Example Image"
        width={1080} // Sesuaikan width dan height untuk menjaga rasio aspek
        height={720}
        layout="responsive" // Menjaga rasio aspek dengan lebar responsif
        objectFit="cover"
        placeholder="blur"
        blurDataURL={url.base64}
      />
      <CardPreview />
    </Link>
  );
}
const CardPreview = () => {
  return (
    <div className="w-full h-full bg-black/45 absolute top-0 opacity-0 transition-300 group-hover:opacity-100"></div>
  );
};
