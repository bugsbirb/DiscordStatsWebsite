
import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { findOne } from "@/util/mongo";
import { withAuth } from "@/util/api-middleware";

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
    const { id } = await context.params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bot = await findOne("submissions", { id, userId: session.user.id });
    if (!bot) {
      return NextResponse.json({ message: "Bot not found" }, { status: 404 });
    }
    return NextResponse.json(bot);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
