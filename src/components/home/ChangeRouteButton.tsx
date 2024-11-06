"use client";
import React, { FC, useCallback } from 'react';
import { useRouter } from '@/lib';

const ChangeRouteButton: FC = () => {
    const router = useRouter()
    const changeRouteClickHandler = useCallback(() => {
        // router.push("/");
        // for show loading on page navaigation you should set showPageLoading to true
        router.push("/sdfsdf", { showPageLoading: true });
    }, [router])
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changeRouteClickHandler}>
            Change Route
        </button>
    )
}

export default ChangeRouteButton