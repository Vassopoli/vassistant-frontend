"use client";

import configureAmplify from "@/utils/configureAmplify";

configureAmplify();

export default function AmplifyClientInitializer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
