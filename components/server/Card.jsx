import Image from "next/image";
import {
  allBlurredDataUrls,
  FormatDate,
  splitArrayIntoThree,
} from "@/app/lib/utils";
import Link from "next/link";
import { getFakeData, getImg, getPageData } from "@/app/lib/data";

export async function BentoCardWrapper({ query, topic }) {
  const { searchQuery = "", page, limit } = query;
  // const mainData = await allBlurredDataUrls(
  //   await getPageData(searchQuery, page, limit, topic)
  // );
  const mainData = await allBlurredDataUrls(await getFakeData(12));
  const [fakeData1, fakeData2, fakeData3] = await splitArrayIntoThree(mainData);
  return (
    <>
      {mainData.length === 0 ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p>Data {searchQuery || "you search"} not found...</p>
        </div>
      ) : (
        <div className="w-full h-screen grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex-1 flex flex-col gap-y-3">
            {fakeData1.map((item) => (
              <BentoCardItem object={item} key={item.id} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-y-3">
            {fakeData2.map((item) => (
              <BentoCardItem object={item} key={item.id} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-y-3">
            {fakeData3.map((item) => (
              <BentoCardItem object={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export async function BentoCardItem({ object }) {
  const { urls, id, created_at, user } = object;
  return (
    <Link className="w-full h-auto relative group" href={`/${id}/detail`}>
      <Image
        src={`${urls.regular}`}
        alt="Example Image"
        width={1080} // Sesuaikan width dan height untuk menjaga rasio aspek
        height={720}
        layout="responsive" // Menjaga rasio aspek dengan lebar responsif
        objectFit="cover"
        placeholder="blur"
        blurDataURL={urls.base64}
      />
      <CardPreview created_at={created_at} user={user} />
    </Link>
  );
}
const CardPreview = ({ created_at, user }) => {
  const created = FormatDate(created_at);
  const profile = user.profile_image.large;
  return (
    <div className="w-full h-full bg-black/45 absolute top-0 opacity-0 transition-300 group-hover:opacity-100">
      <div className="absolute bottom-5 left-5 flex items-center gap-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
          <Image src={profile} alt={user.id} fill objectFit="cover" />
        </div>
        <p className="text-white">{user.name}</p>
        <p className="text-xs">{created}</p>
      </div>
    </div>
  );
};

export function TopContributorsCard({ contributors }) {
  return (
    <div className="w-[306px] h-[306px] border rounded-xl px-5 py-5 hidden md:flex flex-col ">
      <p className="font-bold mb-3">Top Contributors</p>
      <div className="w-full flex-1 gap-y-1 flex flex-col overflow-y-auto thin-scrollbar">
        {contributors.map((contributor) => (
          <TopContributorsItem user={contributor} key={contributor.id} />
        ))}
      </div>
    </div>
  );
}
function TopContributorsItem({ user }) {
  const { id, name, username, profile_image } = user;
  return (
    <div className="w-full h-[56px] rounded-xl flex items-center px-2 gap-x-2 shrink-0 hover:bg-slate-200/55 cursor-pointer ">
      <div className="w-10 h-10 rounded-full overflow-hidden relative">
        <Image
          fill
          src={profile_image.large}
          alt="image"
          placeholder="blur"
          blurDataURL={profile_image.base64}
        />
      </div>
      <div className="">
        <p>{name}</p>
        <p className="text-xs">{username}</p>
      </div>
    </div>
  );
}
