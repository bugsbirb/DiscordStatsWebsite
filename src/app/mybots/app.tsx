"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Bot {
  id: string;
  username: string;
  status: "online" | "offline" | "in review";
  description: string;
}

export function OwnedBotsList({ AppData }: { AppData: Bot[] }) {
  const [bots, setBots] = useState<Bot[]>([]);

  useEffect(() => {
    if (AppData) {
      setBots(AppData);
    }
  }, [AppData]);

  if (bots.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 pb-4 text-center">
          <p className="text-lg font-medium mb-4">You don't have any bots yet.</p>
          <Button asChild>
            <Link href="/submit">Add Your First Bot</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bots.map((bot) => (
        <Card key={bot.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {bot.username}
              <Badge variant={bot.status === "online" ? "default" : bot.status === "offline" ? "secondary" : "outline"}>
                {bot.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardFooter className="mt-auto">
            <div className="flex justify-between w-full">
              <Button variant="outline" asChild>
                <Link href={`/manage/${bot.id}`}>Manage</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
