"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Header from "./Header";

export default function HeaderClient() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return <Header signOut={signOut} user={user} />;
}