"use client";
import { Authenticator } from "@aws-amplify/ui-react";

export default function AuthenticatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}