import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Header from "@/components/nav";
import { ManageBotForm } from "./manage";
import { auth } from "~/auth";

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
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const bot = await GetBot(params.id);

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ManageBotForm bot={bot} />
      </div>
    </main>
  );
}
