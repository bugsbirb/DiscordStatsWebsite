import { SearchResults } from "./results";
import Head from "next/head";
import Header from "@/components/nav";

export async function GetResults(params: { query: string }) {
  const res = await fetch(`${process.env.SITE}/api/search?q=${params.query}`, {
    method: "GET",
  });
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams)?.q || "placeholder";
  const bots = await GetResults({ query });

  return (
    <>
      <Header />

      <main>
        <SearchResults bots={bots} query={""} />
      </main>
    </>
  );
}
