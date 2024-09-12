import { getFakeData, getImgDetail, getRelatedImg } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { relatedImg, tags } from "@/app/lib/static_data";
import { CategoryTag } from "@/components/Tag";

export default async function page({ params }) {
  const id = params.id;
  // const related_data = await getImgDetail(id);
  const imgDetail = await getFakeData(0, "object");
  // const imgDetail = await getImgDetail(id);
  const related_data = await getRelatedImg(relatedImg);
  // const related_data = await getRelatedImg(imgDetail);
  const { created_at, alt_description, urls, user, related_collection } =
    imgDetail;
  return (
    <>
      <div className="w-full h-full bg-black overflow-y-auto overflow-x-hidden pb-40">
        <div className="w-full h-1/2 relative group cursor-pointer">
          <div className="w-full h-full absolute bg-black/45 z-30 transition-all duration-500 group-hover:opacity-0"></div>
          <Image
            src={
              // "https://images.unsplash.com/photo-1721332149069-a470150ef51c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTAzMDl8MHwxfGFsbHx8fHx8fHx8fDE3MjU4Njk5NTF8&ixlib=rb-4.0.3&q=80&w=1080"
              `${urls.regular}`
            }
            alt={"img"}
            fill
            className="object-cover object-center z-0"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="text-white z-50 absolute bottom-10 left-5 transition-all duration-500  group-hover:opacity-0">
            <p className="text-4xl font-semibold tracking-widest">
              {alt_description}
            </p>
            <div className="mt-1 flex items-center gap-x-2">
              <Image
                src={
                  "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                }
                quality={100}
                alt="profile"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>{user.name}</p>
            </div>
          </div>
          <div className="w-full h-1/2 px-5 tracking-wide overflow-y-auto text-white absolute bottom-10 left-5"></div>
        </div>
        <div className="pl-5 pt-10 text-white">
          <div className="w-[90%] flex flex-wrap gap-3 mb-5">
            {tags.map((tag) => (
              <CategoryTag name={tag.title} />
            ))}
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          quidem nisi velit saepe corrupti nihil atque fuga numquam totam nam,
          adipisci sed ullam sit iure laboriosam delectus excepturi laudantium
          rerum dolorem suscipit
          <p className="text-white text-2xl tracking-widest mt-10">
            Related Contents
          </p>
          <hr className="my-5" />
          <div className="w-full overflow-x-auto flex gap-x-3 snap-x snap-start thin-scrollbar">
            {related_data.map((data) => (
              <RecomendationCard data={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function RecomendationCard({ data }) {
  const { urls, alt_description, user, id } = data;
  return (
    <Link href={`/${id}/detail`}>
      <div className="h-[270px] w-[200px] max-w-[300px] relative group cursor-pointer scroll-mb-10">
        <Image
          className="bg-red-100 object-cover"
          src={urls.regular}
          alt="related"
          fill
        />
        <div className="w-full h-full bg-black/45 z-30 absolute top-0 px-2 opacity-0 transition-300 group-hover:opacity-100">
          <div className="absolute bottom-5 left-4">
            {/* <p className="text-lg tracking-widest mb-2">{alt_description}</p> */}
            <div className="flex w-full items-center gap-x-1">
              {/* <div className="w-[15px] h-[15px] bg-red-100 rounded-full"></div> */}
              {/* <p className="text-[12px] ">{user.name}</p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
