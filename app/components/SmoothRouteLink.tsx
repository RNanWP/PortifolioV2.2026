"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { useRef } from "react";

type SmoothRouteLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

const EXIT_DURATION_MS = 180;

export default function SmoothRouteLink({
  href,
  onClick,
  ...props
}: SmoothRouteLinkProps) {
  const router = useRouter();
  const navigationStarted = useRef(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    const shouldUseNativeNavigation =
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldUseNativeNavigation) return;

    event.preventDefault();
    if (navigationStarted.current) return;
    navigationStarted.current = true;
    document.documentElement.classList.add("is-route-leaving");

    window.setTimeout(() => router.push(href), EXIT_DURATION_MS);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
