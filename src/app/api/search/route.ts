import { NextResponse } from "next/server";
import { findMany } from "@/util/mongo";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("q");

    if (!search || typeof search !== "string") {
      return NextResponse.json({ message: "Invalid or missing search query parameter" }, { status: 400 });
    }

    console.log("Search query:", search);

    const bots = await findMany("submissions", { username: { $regex: search, $options: "i" } });

    return NextResponse.json(bots);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
