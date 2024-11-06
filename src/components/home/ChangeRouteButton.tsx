"use client";
import { useRouter } from '@/lib';
import React, { FC, useCallback } from 'react';

const ChangeRouteButton: FC = () => {
    const router = useRouter()
    const changeRouteClickHandler = useCallback(() => {
        router.push("/");
        // for show loading on page navaigation you should set showPageLoading to true
        // router.push("/", { showPageLoading: true });
    }, [router])
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changeRouteClickHandler}></button>
    )
}

export default ChangeRouteButton