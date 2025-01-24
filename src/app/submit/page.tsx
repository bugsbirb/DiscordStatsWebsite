import BotSubmissionForm from "@/components/submission";
import Header from "@/components/nav";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

export default async function SubmitBotPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}

function MainContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Your Discord Bot</h1>
      <BotSubmissionForm />
    </div>
  );
}
