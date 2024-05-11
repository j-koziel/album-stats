"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { NavbarContent, NavbarItem, Button, User } from "@nextui-org/react";
import Link from "next/link";
import router from "next/router";

import { RootState } from "@/lib/store/store";
import { getUserThunk } from "@/lib/store/thunks/get-user-thunk";
import { signOutUserThunk } from "@/lib/store/thunks/sign-out-user-thunk";

export function AuthNavigation() {
  const state = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      await dispatch(getUserThunk());
    };

    checkIfUserIsAuthenticated();
  }, []);

  return state.isAuthenticated ? (
    <NavbarContent justify="end">
      <div className="flex items-center justify-center gap-x-2">
        <NavbarItem>
          <Button
            color="danger"
            variant="ghost"
            onPress={async () => {
              await dispatch(signOutUserThunk());
              router.push("/");
            }}
          >
            Sign Out
          </Button>
        </NavbarItem>
        <NavbarItem>
          <User as={Link} href="/dashboard" name={state.user.username} />
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
  );
}
