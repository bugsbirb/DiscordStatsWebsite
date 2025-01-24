"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${searchQuery}`)
  }

  


  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Find stats for discord bots</h1>
        <p className="text-xl mb-8 text-muted-foreground">
         Search for any discord bot by name and find detailed information.

        </p>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
          <Input
            type="text"
            placeholder="Search for bots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}

