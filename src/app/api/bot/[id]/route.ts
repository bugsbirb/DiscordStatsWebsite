
import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { findOne, updateOne } from "@/util/mongo";
import { withAuth } from "@/util/api-middleware";
import { setCached } from "@/util/redis";
interface GuildParams {
    id: string;
  }
export const GET = (request: Request, context: { params: GuildParams }) =>
    withAuth<GuildParams>(async (session, { params }) => {
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
});

