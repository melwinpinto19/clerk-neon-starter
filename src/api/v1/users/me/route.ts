import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.json(user);
}
