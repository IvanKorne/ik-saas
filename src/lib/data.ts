import React from "react";
import { Home, Settings, CreditCard } from "lucide-react";

export const sidebarItems = [
  { name: "Home", href: "/dashboard", icon: React.createElement(Home) },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: React.createElement(Settings),
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: React.createElement(CreditCard),
  },
];

export const featureItems = [
  { name: "Create unlimited amount of notes with ease" },
  { name: "Organize your life effectively" },
  { name: "Edit and delete on the fly" },
  { name: "Cancel anytime, anyplace, anywhere" },
];
