import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Image from "next/image";

export default function AuthForm({ navigatorObj, action, children }) {
  console.log(navigatorObj);
  const { endpoint, text } = navigatorObj;
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-1/2 h-full relative md:block">
        <Image
          src={
            "https://images.unsplash.com/photo-1721332149069-a470150ef51c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTAzMDl8MHwxfGFsbHx8fHx8fHx8fDE3MjU4Njk5NTF8&ixlib=rb-4.0.3&q=80&w=1080"
          }
          alt={"img"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <form
        className="w-full h-full border px-5 py-5 md:px-20 md:py-10"
        action={action}
      >
        <div className="w-full flex justify-end mb-10 gap-x-5 items-center">
          <p>{text}</p>
          <Link
            href={`/${endpoint.toLowerCase()}`}
            className="px-3 py-1 rounded-3xl border border-[#7B89F0] text-md transition-all duration-300 tracking-wide hover:bg-[#7B89F0] hover:tracking-wider hover:text-white hover:scale-110"
          >
            {endpoint}
          </Link>
        </div>
        <div className="px-10" id="wrapper">
          {children}
        </div>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  navigatorObj: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};
