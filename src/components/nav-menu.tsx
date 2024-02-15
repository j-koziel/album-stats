"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Link,
  Button,
  NavbarMenuItem,
} from "@nextui-org/react";
import React from "react";

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Artists", link: "/artists" },
    { name: "Releases", link: "/releases" },
    { name: "Sign Up", link: "/sign-up" },
    { name: "Sign In", link: "/sign-in" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-foreground font-bold">
            Album Stats
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/artists" className="cursor-pointer">
            Artists
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/albums" className="cursor-pointer">
            Releases
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/sign-up">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/sign-in" color="primary">
            Sign in
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((menuItem, i) => (
          <NavbarMenuItem key={`${menuItem}-${i}`}>
            <Link
              color="foreground"
              className="w-full"
              href={menuItem.link}
              size="lg"
            >
              {menuItem.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
