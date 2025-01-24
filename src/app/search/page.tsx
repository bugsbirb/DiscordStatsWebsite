import { SearchResults } from "./results";
import Header from "@/components/nav";

async function GetResults(query: string) {
  const res = await fetch(`${process.env.SITE}/api/search?q=${query}`, {
    method: "GET",
  });
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ q: string }>;
}) {
  const { q } = await params;
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
