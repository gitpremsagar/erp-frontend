'use client';

import { resetAuthState } from "@/redux/slices/authSlice";
import { resetUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { authServices } from "@/lib/services/authServices";
import { useState, useCallback } from "react";
import jsCookie from "js-cookie";

export default function useLogOut() {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logOut = useCallback(async () => {
        setIsLoggingOut(true);
        setError(null);

        try {
            const response = await authServices.logOut();
            if(response?.success) {
                dispatch(resetUser());
                dispatch(resetAuthState());
                jsCookie.remove("accessToken");
                jsCookie.remove("refreshToken");
                router.push('/log-in');
            } else {
                setError(response?.message || 'Logout failed');
            }
        } catch (err) {
            setError('An error occurred during logout');
            console.error('Error logging out:', err);
        } finally {
            setIsLoggingOut(false);
        }
    }, [dispatch, router]);

    return {
        logOut,        // Function to call when you want to logout
        isLoggingOut,  // Loading state
        error,         // Error state
    };
}