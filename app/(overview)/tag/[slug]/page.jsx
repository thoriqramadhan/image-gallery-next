import { getTopic } from "@/app/lib/data";
import { topicData, topicPhoto } from "@/app/lib/static_data";
import { allBlurredDataUrls } from "@/app/lib/utils";
import {
  BentoCardWrapper,
  TopContributorsCard,
} from "@/components/server/Card";
import { BentoWrapperSkeletons } from "@/components/skeleton/skeletons";
import React, { Suspense } from "react";

export default async function Page({ searchParams, params }) {
  const page = searchParams.page || "";
  const limit = searchParams.limit || "";
  const { slug, title, owners, description, top_contributors } = await getTopic(
    params.slug
  );
  // const { slug, title, owners, description, top_contributors } = topicData;
  const contributorsBase64 = await allBlurredDataUrls(top_contributors, 2);
  return (
    <div className="container-style ">
      <div className="w-full flex gap-x-3">
        <div className="flex-1 pr-10 flex flex-col gap-y-3 justify-center">
          <p className="text-4xl font-semibold">{title}</p>
          <p className="text-[14px] text-slate-600">
            Curated by {owners[0].name}
          </p>
          <p className="text-[16px] font-medium">{description}</p>
        </div>
        <TopContributorsCard contributors={contributorsBase64} />
        <div className="w-[306px] h-[306px] bg-black hidden lg:block"></div>
      </div>
      <div className="w-full mt-16">
        <Suspense fallback={<BentoWrapperSkeletons />}>
          <BentoCardWrapper query={{ page, limit }} topic={slug} />
        </Suspense>
      </div>
    </div>
  );
}
