"use server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle";
import { auth, signIn } from "~/auth";
import { UserMenu } from "@/components/user-menu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Discord Bot Stats
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              
            </li>
            <li>
              <Link href="/docs" className="hover:text-primary">
                Docs
              </Link>
            </li>

            <li>
              {session ? (
                <UserMenu user={session.user} />
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium"
                >
                  Login
                </Link>
              )}
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
