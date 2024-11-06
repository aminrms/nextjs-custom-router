import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";
import { shouldTriggerStartEvent } from "@/lib/custom-router/patch-router/should-trigger-start-event";

// Extend the LinkProps with additional props if needed
type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  NextLinkProps & {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, onClick, ...rest },
  ref
) {
  const useLink = href && typeof href === "string" && href.startsWith("/");
  if (!useLink) return <a href={href} onClick={onClick} {...rest} ref={ref} />;
  const onNextLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (shouldTriggerStartEvent(href, event)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      window.postMessage({
        type: "change-route-start", data: {
          currentPath: href
        }
      })
    }
    if (onClick) onClick(event);
  }
  return (
    <NextLink
      href={href}
      onClick={onNextLinkClick}
      {...rest}
      ref={ref}
    />
  );
});
