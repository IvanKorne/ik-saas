import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { File, Edit, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { TrashButton } from "@/components/SubmitButtons";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const getData = async (id: string) => {
    // const data = await prisma.note.findMany({
    //   where: {
    //     userId: id,
    //   },
    //   orderBy: {
    //     created_at: "desc",
    //   },
    // });
    const data = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        Notes: true,
        Subscription: {
          select: {
            status: true,
          },
        },
      },
    });
    return data;
  };

  const deleteItem = async (formData: FormData) => {
    "use server";
    const noteId = formData.get("noteId") as string;
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    revalidatePath("/dashboard");
  };

  const data = await getData(user?.id as string);
  return (
    <div className="grid items-start gap-8 mt-2">
      <div className="flex justify-between items-center p-2 ">
        <div className="gap-1 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold">Your Notes</h1>
          <p className="text-muted-foreground text-lg font-semibold">
            Create your own personal notes!
          </p>
        </div>
        {data?.Subscription?.status === "active" ? (
          <Link href="/dashboard/new">
            <Button>Create Note</Button>
          </Link>
        ) : (
          <Link href="/dashboard/billing">
            <Button>Subscrive</Button>
          </Link>
        )}
      </div>
      {data?.Notes.length == 0 ? (
        <div className="flex flex-col min-h-[40vh] items-center justify-center w-full gap-10 mt-10">
          <div className="flex flex-col gap-3 items-center justify-center">
            <File className="text-primary bg-primary/30 rounded-full p-5 size-20" />
            <h1 className="text-center text-4xl font-extrabold md:text-5xl">
              No Notes Found
            </h1>
          </div>
          <Link href="/dashboard/new">
            <Button>Create New Note</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-2 mt-2">
          {data?.Notes.map((note) => (
            <Card
              key={note.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-primary">
                  {note.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(note.created_at))}
                </p>
              </div>
              <div className="flex gap-4">
                <Link href={`/dashboard/new/${note.id}`}>
                  <Button size="icon">
                    <Edit className="size-5" />
                  </Button>
                </Link>
                <form action={deleteItem}>
                  <input type="hidden" name="noteId" value={note.id} />
                  <TrashButton />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
