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
} from "@nextui-org/react";
import React from "react";

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-foreground">
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
          <Link color="foreground">Albums</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground">Songs</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/sign-up">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
