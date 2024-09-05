import React from "react";
import { addUser, getUser } from "@/app/lib/data";
import Link from "next/link";
import { Input } from "../ui/auth/Input";

export default async function Page() {
  const obj = { username: "test", email: "test@gmail.com", password: 1345678 };
  console.log(obj);
  // await addUser(obj)
  // await getUser();
  return (
    <>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-1/2 h-full hidden md:block"></div>
        <form className="w-full h-full border px-5 py-5 md:px-20 md:py-10">
          <div className="w-full flex justify-end mb-10 gap-x-5 items-center">
            <p>Dont have an account?</p>
            <Link
              href={"/register"}
              className="px-3 py-1 rounded-3xl border border-[#7B89F0] text-md transition-all duration-300 tracking-wide hover:bg-[#7B89F0] hover:tracking-wider hover:text-white hover:scale-110"
            >
              Register
            </Link>
          </div>
          <h1 className="font-semibold text-2xl">Login to your account.</h1>
          <Input name="Username" placeholder={"Input your username"} />
          <Input name="Email" type="email" placeholder={"Input your email"} />
          <Input
            name="Password"
            type="password"
            placeholder={"Input your password"}
          />
          <button className="mt-3 px-3 py-2 bg-[#7336FF] w-full text-white tracking-wider font-medium">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
