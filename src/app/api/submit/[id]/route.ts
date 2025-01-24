import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { findOne, insertOne, updateOne } from "@/util/mongo";
import Discord from "next-auth/providers/discord";



export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = (await context.params);

    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const submission = await findOne("submissions", { id });
    const DiscordBot = await getDiscordBot(id);

    if (!DiscordBot) {
      console.log("DiscordBot is null");
      return NextResponse.json(
        { status: 404, message: "Discord bot not found" },
        { status: 404 }
      );
    }
    if (DiscordBot.code === 10013) {
      return NextResponse.json(
        { status: 404, message: "Discord bot not found" },
        { status: 404 }
      );
    }    
    if (DiscordBot.bot === false) {
      return NextResponse.json(
        { status: 400, message: "Discord user is not a bot" },
        { status: 400 }
      );
    }

    if (submission && submission.status === "PENDING") {
      return NextResponse.json(
        { status: 409, message: "Submission already exists" },
        { status: 409 }
      );
    } else {
      await insertOne("submissions", {
        ...req.body,
        id,
        userId: session.user.id,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
        banner: DiscordBot.banner,
        avatar: DiscordBot.avatar,
        username: DiscordBot.username,
        discriminator: DiscordBot.discriminator,
      });
      return NextResponse.json({ message: "Submission created successfully" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot: boolean;
  banner: string | null;
  code: number;
};

async function getDiscordBot(ID: string) {
  if (!ID) {
    return null; 
  }
  const url = `https://discord.com/api/users/${ID}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
    method: "GET",
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
  }
  const responseJson = await response.json();
  return responseJson;
}