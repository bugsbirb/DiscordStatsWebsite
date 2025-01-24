
import { useParams } from 'next/navigation'
import { ManageBotForm } from './manage'
import Header from "@/components/nav"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/auth";



export async function GetBot(params: { id: string }) {
    const cookieStore = cookies();
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

  return res.json();
}

export default async function Page({params }: {  params: {id:string} }) {    
    const session = await auth();
    if (!session) {
      redirect("/");
    }
    const bot = await GetBot(await params)
    
    return (
      <main>
        <Header/>
        <div className="container mx-auto px-4 py-8">
          <ManageBotForm bot={bot} />
        </div>
      </main>
    );
  }
