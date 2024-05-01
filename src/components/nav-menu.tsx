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
  User,
} from "@nextui-org/react";
import React from "react";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(false);
  const router = useRouter();

  const supabase = createClient();

  const menuItems = [
    { name: "Artists", link: "/artists" },
    { name: "Releases", link: "/releases" },
    { name: "Sign Up", link: "/sign-up" },
    { name: "Sign In", link: "/sign-in" },
  ];

  React.useEffect(() => {
    const isUserAuthenticated = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) setIsUserAuthenticated(false);

      data.user ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
    };

    isUserAuthenticated();
  }, []);

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
          <Link color="foreground" href="/releases" className="cursor-pointer">
            Releases
          </Link>
        </NavbarItem>
      </NavbarContent>
      {isUserAuthenticated ? (
        <NavbarContent justify="end">
          <div className="flex items-center justify-center gap-x-2">
            <NavbarItem>
              <Button
                color="danger"
                variant="ghost"
                onPress={async () => {
                  const { error } = await supabase.auth.signOut();

                  if (error) {
                    router.push("/error");
                  }

                  router.push("/");
                }}
              >
                Sign Out
              </Button>
            </NavbarItem>
            <NavbarItem>
              <User as={Link} href="/dashboard" name="John doe" />
            </NavbarItem>
          </div>
        </NavbarContent>
      ) : (
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
      )}

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
