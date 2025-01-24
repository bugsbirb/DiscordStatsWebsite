
import { notFound } from "next/navigation"
import Header from "@/components/nav"
import { cookies } from "next/headers";
import { BotInfo } from "@/components/bot-info"
import { GuildGraph } from "@/components/guildgraph"


export async function GetBot(params: { id: string }) {

    const cookieStore = await cookies();
    const cookieEntries = (await cookieStore).getAll(); 
    const cookieString = cookieEntries
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  
    const res = await fetch(`${process.env.SITE}/api/bot/${params.id}`, {
      method: "GET",
      headers: {
        Cookie: cookieString,
      },
    });
  
    if (!res.ok) {
        notFound();
    }
  
    return res.json();
}

export default async function BotPage({params}: {params: {id: string}}) {
  const bot = await GetBot(await params);
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
  )
}
