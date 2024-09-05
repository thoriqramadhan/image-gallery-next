import React from "react";
import { addUser, getUser } from "@/app/lib/data";

export default async function Page() {
  const obj = { username: "test", email: "test@gmail.com", password: 1345678 };
  console.log(obj);
  // await addUser(obj)
  // await getUser();
  return (
    <>
      <div className="w-full h-full flex justify-center items-center ">
        <form className="w-full h-full border px-5 py-5">
          <h1 className="font-semibold text-xl">Login to your account.</h1>
          <div className="">
            <label htmlFor="">Username</label>
            <input
              type="text"
              name=""
              id=""
              className="block border px-3 py-2 rounded-md w-full font-medium tracking-wider"
            />
          </div>
        </form>
      </div>
    </>
  );
}
