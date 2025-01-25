"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns" 

interface GuildData {
  timestamp: string
  guilds: number
}

export function GuildGraph({ data }: { data: GuildData[] }) {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Guild Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No data available. Head to the documentation to learn how to add data.</p>
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map((entry) => ({
    name: format(new Date(entry.timestamp), "MMM dd"),
    guilds: entry.guilds,
  }));



  return (
    <Card>
      <CardHeader>
        <CardTitle>Guild Growth Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={formattedData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line type="monotone" dataKey="guilds" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
