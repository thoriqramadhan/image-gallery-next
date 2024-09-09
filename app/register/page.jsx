import React from "react";
import { Input } from "@/components/auth/Input";
import AuthForm from "../../components/auth/AuthForm";

export default function Page() {
  const navigator = { endpoint: "Login", text: "Already have an account?" };
  return (
    <AuthForm navigatorObj={navigator}>
      <h1 className="font-semibold text-2xl">Register your account!.</h1>
      <Input name="Username" placeholder={"Input your username"} />
      <Input name="Email" type="email" placeholder={"Input your email"} />
      <Input
        name="Password"
        type="password"
        placeholder={"Input your password"}
      />
      <button className="mt-3 px-3 py-2 bg-[#7336FF] w-full text-white tracking-wider font-medium">
        Register
      </button>
    </AuthForm>
  );
}
