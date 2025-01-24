import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface Bot {
  id: string
  username: string
  description: string
  avatar: string
  guildCount: number
}

export function BotInfo({ bot }: { bot: Bot }) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center gap-4">
        <img src={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`} alt={bot.username} className="h-20 w-20 rounded-full" />
        <div>
          <CardTitle className="text-2xl">{bot.username}</CardTitle>
          <p className="text-muted-foreground">{bot.description}</p>
        </div>
      </CardHeader>
    </Card>
  )
}

