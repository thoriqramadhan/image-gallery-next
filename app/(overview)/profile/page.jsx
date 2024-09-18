import { updateUser } from "@/app/lib/action";
import { getUser } from "@/app/lib/data";
import { decrypt } from "@/app/lib/session";
import { Input } from "@/components/auth/Input";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const cookie = cookies().get("session");
  const session = await decrypt(cookie.value);
  const user = await getUser(session.userId);
  const { username, email, password } = user;
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <div className="container-style">
        <h1 className="text-subheading">Profile</h1>
        <p>All of your profile information configuration is here</p>
        <form action={updateUser}>
          <Input name={"Username"} type="text" defaultValue={username} />
          <Input name={"Email"} type="email" defaultValue={email} />
          <Input name={"Password"} type="password" required={false} />
          <button className="mt-3 px-3 py-2 bg-[#7336FF] w-full text-white tracking-wider font-medium">
            Edit
          </button>
        </form>
        {/* <h1 className="mt-10">Hello, {user.username}</h1> */}
      </div>
    </>
  );
}
