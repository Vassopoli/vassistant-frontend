"use client";

import { useEffect } from "react";
import configureAmplify from "@/utils/configureAmplify";

export default function AmplifyClientInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    configureAmplify();
  }, []);

  return <>{children}</>;
}
