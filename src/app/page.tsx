"use client";
import MainContent from "@/components/MainContent";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function Home({ signOut, user }: { signOut?: () => void; user?: any }) {
  return <MainContent signOut={signOut} user={user} />;
}

export default withAuthenticator(Home);
