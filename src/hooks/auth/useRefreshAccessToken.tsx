import { axiosWithCredentials } from "@/lib/api/custom-axios-request";
import { API } from "@/lib/constants";
import jsCookie from "js-cookie";
import { useState } from "react";
import { setAuthState } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default async function useRefreshAccessToken() {

    const dispatch = useDispatch();
    
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attemptSuccess, setAttemptSuccess] = useState(false);
    
    const accessToken = jsCookie.get("accessToken");
    
    if(!accessToken) {
        setError("No access token found");
        setIsRefreshing(false);
        setAttemptSuccess(false);
    }

    const response = await axiosWithCredentials.post(API.AUTH.REFRESH_ACCESS_TOKEN);
    if(response.status === 200) {

        // store accessToken and user info in redux store
        dispatch(setAuthState({isAuthenticated: true, accessToken: response.data.accessToken}));
        dispatch(setUser({...response.data.user}));
        // new access token cookie is aoutomatically set by the server

        setIsRefreshing(false)
        setAttemptSuccess(true);
    } else {
        setError("Failed to refresh access token");
        setIsRefreshing(false);
        setAttemptSuccess(false);
    }
    
    return {
        isRefreshing,
        error,  
        attemptSuccess,
    }
}

export { useRefreshAccessToken };