import Header from "@/components/nav"
import Hero from "@/components/landing"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  )
}
