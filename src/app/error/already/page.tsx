import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/nav"

export default function Already() {
  return (
    <>
      <Header />
      <MainContent />
    </>
  )
}

function MainContent() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Bot Already Submitted</h1>
      <p className="text-xl mb-8">This bot has already been submitted for review.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
