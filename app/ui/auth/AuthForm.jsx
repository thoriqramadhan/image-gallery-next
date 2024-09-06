import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function AuthForm({ navigatorObj, action, children }) {
  console.log(navigatorObj);
  const { endpoint, text } = navigatorObj;
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-1/2 h-full hidden md:block"></div>
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
