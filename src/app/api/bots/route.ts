
import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { find } from "@/util/mongo";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bots = await find("submissions", {"userId": session.user.id, "status": "ACTIVE"});
    return NextResponse.json(bots);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
