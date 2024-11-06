import { useRouter as useRouterOriginal } from 'next/navigation';
import { shouldTriggerStartEvent } from '@/lib/custom-router/patch-router/should-trigger-start-event';
import { useCallback } from 'react';

export function useRouter() {
  const router = useRouterOriginal();

  const changeRouteStart = useCallback((href: string) => {
    window.postMessage({
      type: 'change-route-start',
      data: {
        currentPath: href,
      },
    });
  }, []);

  return {
    ...router,
    push: (href: string, options?: { showPageLoading?: boolean } & Parameters<typeof router.push>[1]) => {
      if (shouldTriggerStartEvent(href)) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

        if (options?.showPageLoading) {
          changeRouteStart(href);
        }
      }

      return router.push(href, options); // Call the original push method
    },
    replace: (href: string, options?: { showPageLoading?: boolean } & Parameters<typeof router.replace>[1]) => {
      if (shouldTriggerStartEvent(href)) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

        if (options?.showPageLoading) {
          changeRouteStart(href);
        }
      }

      return router.replace(href, options); // Call the original replace method
    },
  };
}
