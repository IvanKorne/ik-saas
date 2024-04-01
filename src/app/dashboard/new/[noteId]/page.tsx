import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteButton } from "@/components/SubmitButtons";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore } from "next/cache";

const NotePage = async ({ params }: { params: { id: string } }) => {
  const getData = async ({ userId, noteId }: NoteDataProps) => {
    unstable_noStore();
    const data = await prisma.note.findUnique({
      where: {
        id: noteId,
        userId: userId,
      },
      select: {
        title: true,
        description: true,
        id: true,
      },
    });
    return data;
  };
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user?.id as string, noteId: params.id });

  const updateNow = async (formData: FormData) => {
    "use server";
    if (!user) {
      throw new Error("Not Allowed");
    }
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user?.id,
      },
      data: {
        description: desc,
        title: title,
      },
    });
    revalidatePath("/dashboard");
    return redirect("/dashboard");
  };

  return (
    <Card className="mt-10">
      <form action={updateNow}>
        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="text-3xl font-bold">New Note</CardTitle>
          <CardDescription>
            This is where you can create and customize your own personal notes!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Label className="text-lg font-semibold">Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Enter title here..."
              defaultValue={data?.title}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg font-semibold">Description</Label>
            <Textarea
              name="desc"
              placeholder="Enter note here..."
              required
              defaultValue={data?.description}
            ></Textarea>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href="/dashboard">
            <Button className="bg-red-700">Cancel</Button>
          </Link>
          <NoteButton />
        </CardFooter>
      </form>
    </Card>
  );
};

export default NotePage;
