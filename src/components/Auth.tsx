"use client";
import { useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import MainContent from "./MainContent";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import Header from "./Header";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
    },
  },
});

function Auth({ signOut, user }: { signOut?: () => void; user?: any }) {
  useEffect(() => {
    const getToken = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (token) {
          alert("JWT Token: " + token);
        } else {
          alert("JWT Token not found.");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching JWT Token.");
      }
    };

    getToken();
  }, []);

  return (
    <>
      <Header signOut={signOut} user={user} />
      <MainContent signOut={signOut} user={user} />
    </>
  );
}

export default withAuthenticator(Auth);