import React from "react";
import { loginUser } from "../lib/action";
import { Input } from "@/components/auth/Input";
import AuthForm from "../../components/auth/AuthForm";

export default async function Page() {
  const obj = { username: "test", email: "test@gmail.com", password: 1345678 };
  const navigator = { endpoint: "Register", text: "Dont have an account?" };
  return (
    <>
      <AuthForm navigatorObj={navigator} action={loginUser}>
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
      </AuthForm>
    </>
  );
}
