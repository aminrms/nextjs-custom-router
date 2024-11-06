"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, type FC, type PropsWithChildren } from 'react'

// Type definition for props, which expects children as a prop
type ChangeRouteLoadingProps = PropsWithChildren<{}>;

const ChangeRouteLoading: FC<ChangeRouteLoadingProps> = ({ children }) => {
    // State to track whether the loading indicator should be shown
    const [showLoading, setShowLoading] = useState(false);
    // Get the current pathname using Next.js' `usePathname`
    const pathname = usePathname();

    // Effect hook to listen for route start event from the window's message event
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Callback to handle incoming message events
            const getMessageCallback = (event: MessageEvent<any>) => {
                if (event.data.type === 'change-route-start') {
                    // Show loading when route change starts
                    setShowLoading(true);
                }
            };

            // Callback to stop showing loading
            const removeMessageCallback = (event: MessageEvent<any>) => {
                setShowLoading(false); // Hide loading on message event
            };

            // Add event listener for "message" events
            window.addEventListener('message', getMessageCallback);

            // Cleanup function to remove event listener when component unmounts
            return () => {
                window.removeEventListener('message', removeMessageCallback);
            };
        }
    }, []); // This runs only once on mount since the dependency array is empty

    // Effect hook to reset loading state when the pathname changes (i.e., when navigating to a new page)
    useEffect(() => {
        setShowLoading(false); // Hide loading when pathname changes
    }, [pathname]);

    // Render loading indicator if showLoading is true, otherwise render children
    return (
        showLoading ?
            <div>Loading...</div> // Replace this with your custom loading component if needed
            : children // Render children when loading is not needed
    );
}

export default ChangeRouteLoading;
