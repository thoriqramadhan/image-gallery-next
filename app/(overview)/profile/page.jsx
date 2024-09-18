import { getUser } from "@/app/lib/data";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const cookie = cookies().get("session");
  const session = await decrypt(cookie.value);
  const user = await getUser(session.userId);
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <div className="container-style">
        Profile
        <h1 className="mt-10">Hello, {user.username}</h1>
      </div>
    </>
  );
}
