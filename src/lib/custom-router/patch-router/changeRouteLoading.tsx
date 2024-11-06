"use client"
import LoadingComponent from '@/components/core/UI/loadings/PageLoadingComponent';
import useGetPathname from '@/hooks/useGetPathname';
import React, { useEffect, useState, type FC, type PropsWithChildren } from 'react'


type ChangeRouteLoadingProps = PropsWithChildren
const CHangeRouteLoading: FC<ChangeRouteLoadingProps> = ({ children }) => {
    const [showLoading, setShowLoading] = useState(false);
    const [currentPath, setCurrentPath] = useState("")
    const pathname = useGetPathname();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const getMessageCallback = (event: MessageEvent<any>) => {
                if (event.data.type === 'change-route-start') {
                    setShowLoading(true);
                    setCurrentPath(event.data?.data?.currentPath)
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
    }, [pathname])
    return (
        showLoading ?
            <LoadingComponent />
            : children
    )
}




export default CHangeRouteLoading