"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

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
          <Link
            key={menu.href}
            className={classNames({
              "text-zinc-950": menu.href === currentPath,
              "text-zinc-500": menu.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={menu.href}
          >
            {menu.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
