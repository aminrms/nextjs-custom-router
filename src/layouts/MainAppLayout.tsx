import CHangeRouteLoading from '@/lib/custom-router/patch-router/changeRouteLoading'
import React, { FC, PropsWithChildren } from 'react'

type MainAppLayoutProps = PropsWithChildren

const MainAppLayout: FC<MainAppLayoutProps> = ({ children }) => {
    return (
        <CHangeRouteLoading>
            {/* rest global tags here */}
            {children}
            {/* rest global tags here */}
        </CHangeRouteLoading>
    )
}

export default MainAppLayout