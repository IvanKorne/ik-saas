"use client";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }
  return (
    <main className="flex items-center mx-auto justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 lg:px-16 md:px-12 max-w-7xl ">
        <div className="  text-center max-w-3xl mx-auto mt-20">
          <div>
            <span className="bg-secondary rounded-full px-6 py-3 w-auto">
              <span className="text-semibold text-md text-primary">
                Sort your notes easily!
              </span>
            </span>

            <h1 className="text-3xl lg:text-6xl font-extrabold mt-8">
              Create Notes with Ease
            </h1>
            <p className="text-lg lg:text-xl font-semibold mt-6 mx-auto text-secondary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              corporis qui cupiditate magnam accusantium autem, earum cum
              placeat ex fuga adipisci molestias dolores voluptates suscipit
              culpa nihil cumque sint rerum!
            </p>
          </div>
          <div className="mt-5 max-w-sm rounded-full mx-auto flex justify-center">
            <RegisterLink>
              <Button
                size="lg"
                className="w-full text-gray-300 font-bold bg-green-700"
              >
                Sign Up for Free!
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </main>
  );
}
