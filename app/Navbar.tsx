"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const menus = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {menus.map((menu) => (
          <li key={menu.href}>
            <Link
              className={classNames({
                "text-zinc-950": menu.href === currentPath,
                "text-zinc-500": menu.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={menu.href}
            >
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Logout</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Log In</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
