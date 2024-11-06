"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, type FC, type PropsWithChildren } from 'react'

type ChangeRouteLoadingProps = PropsWithChildren
const CHangeRouteLoading: FC<ChangeRouteLoadingProps> = ({ children }) => {
    const [showLoading, setShowLoading] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const getMessageCallback = (event: MessageEvent<any>) => {
                if (event.data.type === 'change-route-start') {
                    setShowLoading(true);
                }
            };
            const removeMessageCallback = (event: MessageEvent<any>) => {
                setShowLoading(false)
            }
            window.addEventListener('message', getMessageCallback)
            return () => {
                window.removeEventListener('message', removeMessageCallback)
            }
        }
    }, []);
    useEffect(() => {
        setShowLoading(false);
    }, [pathname]);
    return (
        showLoading ?
            <div>Loading...</div>
            : children
    )
}




export default CHangeRouteLoading