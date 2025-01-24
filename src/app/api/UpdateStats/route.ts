import { NextRequest, NextResponse } from "next/server";
import { updateOne } from "@/util/mongo";

export const POST = async (req: NextRequest) => {
  const auth = req.headers.get("Authorization") || "";
  console.log(auth)

  try {
    const body = await req.json();

    const result = await updateOne(
      "submissions",
      { key: auth },
      {
        $push: {
          stats: {
            timestamp: new Date(),
            guilds: body.guilds,
          },
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No bot found or no update made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Stats updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
