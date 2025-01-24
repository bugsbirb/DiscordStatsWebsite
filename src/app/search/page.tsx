import { SearchResults } from "./results";
import Header from "@/components/nav";

interface Bot {
  id: string;
  username: string;
  description: string;
  avatar: string;
}

async function GetResults(query: string): Promise<Bot[]> {
  try {
    const res = await fetch(`${process.env.SITE}/api/search?q=${query}`, {
      method: "GET",
    });
    
    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return []; 
  }
}

export default async function Page({ searchParams }: { searchParams: { q?: string } }) {    const query = searchParams.q || ""; 
  const q = decodeURIComponent(query);
  const bots = await GetResults(q);

  return (
    <>
      <Header />
      <main>
        <SearchResults bots={bots} query={q} />
      </main>
    </>
  );
}
