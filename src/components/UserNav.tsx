"use client";
import React from "react";
import { sidebarItems } from "@/lib/data";
import { DoorClosed } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const UserNav = ({ user }: any) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative size-10 rounded-full">
            <Avatar className="size-10 rounded-full">
              <AvatarImage src={user?.picture} alt="user" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1 mx-auto rounded-xl px-2 py-1">
              <span className="text-sm font-semibold">{user?.given_name}</span>
              <span className="text-gray-400 text-xs">{user?.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {sidebarItems.map((item, id) => (
              <Link href={item.href} key={id}>
                <DropdownMenuItem asChild>
                  <div className="flex gap-1 mx-auto justify-between items-center">
                    <span className="text-primary">{item.icon}</span>
                    <span className="">{item.name}</span>
                  </div>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full flex justify-between items-center"
            asChild
          >
            <LogoutLink>
              <DoorClosed className="text-primary" />
              Logout
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNav;
