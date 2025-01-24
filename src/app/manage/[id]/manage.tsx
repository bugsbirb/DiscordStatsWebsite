'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Bot {
  id: string
  name: string
  status: string
}

export function ManageBotForm({ bot }: { bot: Bot }) {
  const [apiKey, setApiKey] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const generateApiKey = async () => {
    setIsGenerating(true)
    try {
      const newApiKey = 'api_' + Math.random().toString(36).substr(2, 32)
      const res = await fetch(`/api/key/${bot.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: newApiKey }),
      
      })
      if (!res.ok) {
        throw new Error("Failed to generate API key")
      }
      const data = await res.json()
      setApiKey(newApiKey)

      toast({
        title: "API Key Generated",
        description: "Your new API key has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const deleteBot = async () => {

      const res = await fetch(`/api/delete/${bot.id}`, {
        method: "DELETE",
      })

     

    setIsDeleting(true)
    try {
      toast({
        title: "Bot Deleted",
        description: "Your bot has been deleted successfully.",
      })
      router.push('/mybots')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete bot. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <div className="flex space-x-2">
            <Input id="apiKey" value={apiKey} readOnly placeholder="No API key generated" />
            <Button onClick={generateApiKey} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Bot</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your bot
                and remove all of its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteBot} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
