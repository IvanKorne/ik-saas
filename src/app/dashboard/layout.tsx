import React from "react";
import Sidebar from "@/components/Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { unstable_noStore } from "next/cache";

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: getDataProps) {
  unstable_noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
    });
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}

const DashboardLayout = async ({ children }: DashboardProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  await getData({
    email: user?.email as string,
    firstName: user?.given_name as string,
    id: user?.id as string,
    lastName: user?.family_name as string,
    profileImage: user?.picture,
  });

  return (
    <section className="flex flex-col gap-6 mt-20">
      <div className="grid gap-12  mx-auto w-full px-7 md:grid-cols-[200px_1fr]">
        <div className="hidden w-[200px] flex-col md:flex">
          <Sidebar />
        </div>
        <main>{children}</main>
      </div>
    </section>
  );
};

export default DashboardLayout;
