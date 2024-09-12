"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchHandler = useDebouncedCallback((term) => {
    const param = new URLSearchParams(searchParam);
    if (term) {
      param.set("search", term);
      param.set("page", 1);
      param.set("per_page", 12);
    } else {
      param.delete("search");
      param.set("page", 1);
      param.set("per_page", 12);
    }
    replace(`${pathname}?${param.toString()}`);
  }, 300);
  return (
    <label className="h-fit relative" htmlFor="search">
      <CiSearch className="w-6 h-6 absolute left-2 top-[7px]" />
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => searchHandler(e.target.value)}
        className="overflow-hidden border pl-10 pr-3 py-2 rounded-xl text-[14px]"
        defaultValue={searchParam.get("search")?.toString()}
        placeholder="Search photo..."
      />
    </label>
  );
}
