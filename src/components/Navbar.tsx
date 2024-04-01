import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="fixed top-0 right-0 left-0 opacity-80 mx-auto">
      <div className="border-b bg-background h-[10vh] flex items-center">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-3xl">
              Note<span className="text-primary">Vault</span>
            </h1>
          </Link>
          <div className="flex items-center gap-x-8">
            <ThemeToggle />
            <div className="flex items-center gap-x-5">
              {(await isAuthenticated()) ? (
                <UserNav user={user} />
              ) : (
                <div className="flex items-center gap-x-5">
                  <LoginLink>
                    <Button>Sign In</Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button variant="secondary">Sign Up</Button>
                  </RegisterLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
