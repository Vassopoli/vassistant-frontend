"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import MainContent from "./MainContent";
import { Amplify } from "aws-amplify";
import config from "@/../amplifyconfiguration.json";
import Header from "./Header";

Amplify.configure(config);

function Auth({ signOut, user }: { signOut?: () => void; user?: any }) {
  return (
    <>
      <Header signOut={signOut} user={user} />
      <MainContent signOut={signOut} user={user} />
    </>
  );
}

export default withAuthenticator(Auth);