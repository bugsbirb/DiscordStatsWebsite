import { NextResponse } from "next/server";
import { auth } from "~/auth";
import { deleteOne } from "@/util/mongo";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await deleteOne("submissions", { id, userId: session.user.id });
    return NextResponse.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
