import { notFound } from "next/navigation";
import Header from "@/components/nav";
import { cookies } from "next/headers";
import { BotInfo } from "@/components/bot-info";
import { GuildGraph } from "@/components/guildgraph";

async function GetBot(id: string) {
  const cookieStore = await cookies();
  const cookieEntries = (await cookieStore).getAll();
  const cookieString = cookieEntries
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${process.env.SITE}/api/bot/${id}`, {
    method: "GET",
    headers: {
      Cookie: cookieString,
    },
  });

  return res.json();
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const bot = await GetBot(params.id);

  if (!bot) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-8 mt-16">
        <BotInfo bot={bot} />
        <GuildGraph data={bot.stats} />
      </div>
    </>
  );
}
