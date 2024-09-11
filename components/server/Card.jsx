import Image from "next/image";
import { getBase64, RandomNumber } from "@/app/lib/utils";
import Link from "next/link";

export function BentoCardWrapper({ arr }) {
  return (
    <>
      {arr.map((item) => (
        <BentoCardItem url={item.urls} id={item.id} key={item.id} />
      ))}
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
