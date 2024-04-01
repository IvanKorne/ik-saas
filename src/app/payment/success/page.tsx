import React from "react";
import { Card } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StripeSuccess = () => {
  return (
    <section className="w-full min-h-[80vh] flex items-center mt-20 justify-center">
      <Card className="w-[400px]">
        <div className="p-6 flex justify-center items-center flex-col gap-5 ">
          <CircleCheck className="text-green-500 bg-green-400/30 rounded-full size-12 p-2" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-xl font-semibold">Payment Successful</h1>
            <p className="text-md text-muted-foreground text-center">
              Your subscription is now active. Please check your email for
              further instructions
            </p>
          </div>
          <Link href="/dashboard" className="w-full">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default StripeSuccess;
