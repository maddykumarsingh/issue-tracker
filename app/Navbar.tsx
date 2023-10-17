"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";

const Menus = () => {
  const currentPath = usePathname();
  const menus = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
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
  );
};

const AuthMenu = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Log In</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            size="3"
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user!.email} </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <Menus />
          </Flex>
          <AuthMenu></AuthMenu>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
