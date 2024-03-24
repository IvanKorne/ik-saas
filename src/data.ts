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
