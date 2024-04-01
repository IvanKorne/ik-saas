import React from "react";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StripeCancelled = () => {
  return (
    <section className="w-full min-h-[80vh] flex items-center mt-20 justify-center">
      <Card className="w-[400px]">
        <div className="p-6 flex justify-center items-center flex-col gap-5 ">
          <XIcon className="text-red-500 bg-red-400/30 rounded-full size-12 p-2" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-xl font-semibold">Payment Failed</h1>
            <p className="text-md text-muted-foreground text-center">
              Your subscription has not gone through, please try again later!
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

export default StripeCancelled;
