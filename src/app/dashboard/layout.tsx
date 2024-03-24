import React from "react";
import Sidebar from "@/components/Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type DashboardProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
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
