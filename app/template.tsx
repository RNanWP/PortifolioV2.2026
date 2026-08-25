"use client";

import { useEffect } from "react";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    document.documentElement.classList.remove("is-route-leaving");
  }, []);

  return <div className="route-frame">{children}</div>;
}
