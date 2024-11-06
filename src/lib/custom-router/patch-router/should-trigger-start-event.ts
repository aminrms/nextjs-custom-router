import { addBasePath } from "next/dist/client/add-base-path";

// Helper function to create a full URL by combining the base path with the provided href
function getURL(href: string): URL {
  return new URL(addBasePath(href), location.href);
}

// Determines if the click event was modified (i.e., it includes specific key presses or a non-self target)
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");

  // Checks for conditions that modify the default behavior of a link (like opening in a new tab/window)
  return (
    (target && target !== "_self") || // Target is not the same window (_self)
    event.metaKey || // Meta key (Cmd on macOS, Win on Windows) is pressed
    event.ctrlKey || // Control key (Ctrl on Windows, Linux) is pressed
    event.shiftKey || // Shift key is pressed
    event.altKey || // Alt key is pressed
    (event.nativeEvent && event.nativeEvent.button === 1) // Mouse middle button (usually used for opening links in a new tab)
  );
}

// Main function to determine whether a link click should trigger a navigation event
export function shouldTriggerStartEvent(
  href: string, // The URL to navigate to
  clickEvent?: React.MouseEvent // Optional click event to check for modifications
) {
  const current = window.location; // Current page URL
  const target = getURL(href); // Target URL based on the href provided

  // If the click event is modified (e.g., opening in a new tab), don't trigger the navigation
  if (clickEvent && isModifiedEvent(clickEvent)) return false;

  // If the target is on a different origin (domain), don't trigger navigation
  if (current.origin !== target.origin) return false;

  // If the target URL is the same as the current URL (same pathname and search), don't trigger navigation
  if (current.pathname === target.pathname && current.search === target.search)
    return false;

  // If none of the conditions above are met, allow the navigation to proceed
  return true;
}
