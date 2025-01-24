
import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { findOne, updateOne } from "@/util/mongo";
import { withAuth } from "@/util/api-middleware";
import { setCached } from "@/util/redis";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bot = await findOne("submissions", { id, userId: session.user.id });
    if (!bot) {
      return NextResponse.json({ message: "Key not found" }, { status: 404 });
    }
    return NextResponse.json(bot);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;
    const body = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updateResult = await updateOne("submissions", { id, userId: session.user.id }, {
      $set: { ...body, updatedAt: new Date() },
    });

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: "Key not found" }, { status: 404 });
    }

    await setCached(`key:${id}`, { ...body, updatedAt: new Date() });
    return NextResponse.json({ message: "Key updated successfully" });
};
