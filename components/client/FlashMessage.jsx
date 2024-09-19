"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { FaCheck, FaInfo } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function FlashMessage({ flashMessage }) {
  const { value } = flashMessage;
  const { message, type } = JSON.parse(value);
  const [isHidden, setIsHidden] = useState(false);
  const flashTypeProperty = {
    success: {
      icon: React.cloneElement(<FaCheck />),
      color: {
        border: 'border-l-green-500',
        background: 'bg-green-500'
      },
      title: 'Success'
    },
    info: {
      icon: React.cloneElement(<FaInfo />),
      color: {
        border: 'border-l-blue-500',
        background: 'bg-blue-500'
      },
      title: 'Info'
    }
  }
  function handleDisplay() {
    setIsHidden(!isHidden)
  }
  return (
    <div
      className={`w-screen h-screen bg-black/30 backdrop-blur-lg z-50 fixed top-0 flex items-start justify-center py-10 ${isHidden ? "hidden" : ""
        }`} onClick={handleDisplay}
    >
      <div className={`w-[80%] min-h-[100px] max-h-fit bg-white border-l-8  shrink-0 flex items-center gap-x-5 px-10 ${flashTypeProperty[type]?.color?.border}`}>
        <div className={`px-3 py-3 text-white rounded-full ${flashTypeProperty[type]?.color?.background}`}>
          {
            flashTypeProperty[type]?.icon
          }
        </div>
        <span>
          <p className="text-lg font-medium tracking-wide">{flashTypeProperty[type]?.title}</p>
          <p className="tracking-widest text-slate-500">{message}</p>
        </span>
        <div className="flex-1 flex justify-end">
          <RxCross2 className="text-4xl cursor-pointer" onClick={handleDisplay} />
        </div>
      </div>
    </div >
  );
}
