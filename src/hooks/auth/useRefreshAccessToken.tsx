import { axiosWithCredentials } from "@/lib/api/custom-axios-request";
import { API } from "@/lib/constants";
import jsCookie from "js-cookie";
import { useState, useEffect } from "react";
import { setAuthState } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default function useRefreshAccessToken() {
    const dispatch = useDispatch();
    
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attemptSuccess, setAttemptSuccess] = useState(false);
    
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const accessToken = jsCookie.get("accessToken");
                
                if (!accessToken) {
                    setError("No access token found");
                    setIsRefreshing(false);
                    setAttemptSuccess(false);
                    return;
                }

                const response = await axiosWithCredentials.post(API.AUTH.REFRESH_ACCESS_TOKEN);
                if (response.status === 200) {
                    // store accessToken and user info in redux store
                    dispatch(setAuthState({isAuthenticated: true, accessToken: response.data.accessToken}));
                    dispatch(setUser({...response.data.user}));
                    // new access token cookie is automatically set by the server

                    setIsRefreshing(false);
                    setAttemptSuccess(true);
                } else {
                    setError("Failed to refresh access token");
                    setIsRefreshing(false);
                    setAttemptSuccess(false);
                }
            } catch (err) {
                setError("Failed to refresh access token");
                setIsRefreshing(false);
                setAttemptSuccess(false);
            }
        };

        refreshToken();
    }, [dispatch]);
    
    return {
        isRefreshing,
        error,  
        attemptSuccess,
    };
}

export { useRefreshAccessToken };