import React from "react";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteButton } from "@/components/SubmitButtons";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore } from "next/cache";

const NewNote = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const createNote = async (formData: FormData) => {
    unstable_noStore();
    ("use server");
    if (!user) {
      throw new Error("Not Authorized");
    }
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;

    await prisma.note.create({
      data: {
        userId: user?.id,
        description: desc,
        title: title,
      },
    });

    return redirect("/dashboard");
  };

  return (
    <Card className="mt-10">
      <form action={createNote}>
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
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg font-semibold">Description</Label>
            <Textarea
              name="desc"
              placeholder="Enter note here..."
              required
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

export default NewNote;
