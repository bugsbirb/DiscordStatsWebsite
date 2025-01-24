"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  clientId: z.string().min(18).max(19).regex(/^\d+$/, {
    message: "Client ID must be a valid Discord snowflake",
  }),
})

export default function BotSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values.clientId)
    try {
      const response = await fetch(`/api/submit/${values.clientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, status: "PENDING" }),
      })
      console.log(response.status)
      if (response.status === 404 ) {
        router.push(("/error/notabot"))
        return;
      }
      if (response.status === 409) {
        router.push(("/error/already"))
        return;
      }
      

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      toast({
        title: "Bot Submitted Successfully",
        description: "Your bot is now under review. We'll get back to you soon!",
      })
      router.push("/success")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your bot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Client ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your bot's Client ID" {...field} />
              </FormControl>
              <FormDescription>You can find your bot's Client ID in the Discord Developer Portal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Bot"}
        </Button>
      </form>
    </Form>
  )
}

