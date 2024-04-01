import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { featureItems } from "@/lib/data";
import { CheckCircle } from "lucide-react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession, stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import {
  StripeSubmitButton,
  SubscriptionButton,
} from "@/components/SubmitButtons";
import { unstable_noStore } from "next/cache";

const Billing = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const getData = async (userId: string) => {
    unstable_noStore();
    const data = await prisma.subscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        status: true,
        user: {
          select: {
            stripeCustomerId: true,
          },
        },
      },
    });
    return data;
  };
  const data = await getData(user?.id as string);
  const createSubscription = async () => {
    "use server";

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    if (!dbUser?.stripeCustomerId) {
      throw new Error("Cannot get customer ID");
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser?.stripeCustomerId,
      domainUrl: "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });
    return redirect(subscriptionUrl as string);
  };

  const editDetails = async () => {
    "use server";
    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user.stripeCustomerId as string,
      return_url: "http://localhost:3000/dashboard",
    });
    return redirect(session.url);
  };

  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-2">
            <h1 className="text-3xl md:text-4xl ">Subscription</h1>
            <p className="text-lg text-muted-foreground">
              Your subscription is currently active
            </p>
          </div>
        </div>

        <Card className="w-full lg:w-[70%]">
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Change your payment details and view your statement below!
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-3">
            <form action={editDetails}>
              <SubscriptionButton />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <section className="max-w-md mx-auto gap-4 flex flex-col">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div className="rounded-full px-3 py-1 inline-flex text-sm font-semibold text-primary bg-primary/10">
            <h3>Monthly</h3>
          </div>
          <div className="mt-4 text-6xl font-extrabold">
            $30
            <span className="font-semibold ml-1 text-muted-foreground text-xl">
              /mo
            </span>
          </div>
          <p className="font-med ml-1 text-muted-foreground text-md mt-8">
            Write as many notes as you want for $30
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 py-7 bg-secondary rounded-lg m-1 gap-6 sm:p-10 sm:pt-6">
          <ul className="flex flex-col gap-4">
            {featureItems.map((item, id) => (
              <li key={id} className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <CheckCircle className="text-green-500 size-4" />
                </div>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
          <form action={createSubscription} className="w-full">
            <StripeSubmitButton />
          </form>
        </div>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
};

export default Billing;
