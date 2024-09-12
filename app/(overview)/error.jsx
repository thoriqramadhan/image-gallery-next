"use client";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

export default function Error({ error, reset }) {
  return (
    <div className="w-full h-screen flex items-center justify-center text-red-600 flex-col gap-y-3">
      <MdErrorOutline className="text-red-600 text-3xl" />
      {JSON.stringify(error.message)}
      <button
        className="text-white px-5 py-1 rounded-xl bg-blue-500"
        onClick={() => reset()}
      >
        Back
      </button>
    </div>
  );
}
