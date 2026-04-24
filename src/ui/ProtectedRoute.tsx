import type { FC, JSX, ReactNode } from "react"

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    return <>{children}</>
}