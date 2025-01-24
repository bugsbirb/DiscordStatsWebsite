import { cookies } from "next/headers";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/nav"
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { OwnedBotsList } from "./app";
import Head from "next/head";



async function getOwnedBots() {
    const cookieStore = await cookies();
    const cookieEntries = (await cookieStore).getAll(); 
    const cookieString = cookieEntries
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  
    const res = await fetch(`${process.env.SITE}/api/bots`, {
      method: "GET",
      headers: {
        Cookie: cookieString,
      },
    });
  
  return res.json();
}


export default async function AppsPage() {
    const session = await auth();
    if (!session) redirect("/");
    const Apps = await getOwnedBots();
  
    return (
      <main>
        <Header/>
          
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Apps</h1>
          <Button asChild>
            <Link href="/submit">Add New Bot</Link>
          </Button>
        </div>
        <OwnedBotsList AppData={Apps} />
      </div>
      </main>
    );
  }
  