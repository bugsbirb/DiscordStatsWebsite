import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search";
import { UserAvatar } from "@/components/avatar";
interface Bot {
  id: string;
  username: string;
  description: string;
  avatar: string;
}

interface SearchResultsProps {
  bots: Bot[];
  query: string;
}

export function SearchResults({ bots, query }: SearchResultsProps) {
  if (bots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">
          No bots found matching "{query}"
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <SearchBar initialQuery={query} />
      {bots.map((bot) => (
        <div
          key={bot.id}
          className="flex items-center space-x-4 p-4 bg-card hover:bg-accent rounded-lg transition-colors"
        >
          <div className="bg-primary/10 p-2 rounded-full">
          
            <UserAvatar
              user={{
                name: bot.username,
                image: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`  ,
              }}
              className="h-10 w-10"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">{bot.username}</h2>
            <p className="text-sm text-muted-foreground">{bot.description}</p>
          </div>
          <Button asChild variant="ghost">
            <Link href={`/bot/${bot.id}`}>View</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
