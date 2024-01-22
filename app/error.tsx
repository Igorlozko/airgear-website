'use client'

import { useEffect } from "react"
import EmptyState from "./componenets/EmptyState";

interface ErrorStateProps{
    error: Error
}

const ErrorState: React.FC<ErrorStateProps>=({
    error
})=>{
    useEffect(()=>{
        console.error(error);
    },[error]);

    return(
        <EmptyState
            title="Error"
            subtitle="Something went wrong"
        />
    )
};

export default ErrorState;