import { useRouter as useRouterOriginal } from 'next/navigation';
import { shouldTriggerStartEvent } from '@/lib/custom-router/patch-router/should-trigger-start-event';
interface RouteChangeOptions {
  showPageLoading?: boolean;
}
// Helper function to handle common logic for route change
const handleRouteChange = (href: string, options?: { showPageLoading?: boolean }) => {
  if (shouldTriggerStartEvent(href)) {
    // Scroll to top of the page smoothly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // Trigger route start event if needed
    if (options?.showPageLoading) {
      window.postMessage({
        type: 'change-route-start',
        data: { currentPath: href },
      });
    }
  }
};

export function useRouter() {
  const router = useRouterOriginal();

  return {
    ...router,
    push: (href: string, options?: RouteChangeOptions & Parameters<typeof router.push>[1]) => {
      handleRouteChange(href, options); // Call the common route change handler
      return router.push(href, options); // Call the original push method
    },
    replace: (href: string, options?: RouteChangeOptions & Parameters<typeof router.replace>[1]) => {
      handleRouteChange(href, options); // Call the common route change handler
      return router.replace(href, options); // Call the original replace method
    },
  };
}
