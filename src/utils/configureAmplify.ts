"use client";
import { Amplify } from "aws-amplify";

const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
        userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
      },
    },
  });
};

export default configureAmplify;
