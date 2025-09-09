import jsCookie from "js-cookie";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { axiosWithCredentials } from "@/lib/api/custom-axios-request";
import { API } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { setAuthState } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

//logical flow
// 1. if user is authenticated, return true
// 2. if user is not authenticated, check if accessToken cookie is present
// 3. if accessToken cookie is present, then attempt to login with the cookie
    // 3.1. get a fresh cookie from the server with new access token
    // 3.2. store the new access token in the redux store if refresh is successful
       //3.2.1 if refresh is not successful because the jwt is expired, then redirect to login page
    
       // 3.3 update the user info in redux store
    // 3.4. return true

export default function useAttemptLogin() {
    const auth = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const [isAttemptingLogin, setIsAttemptingLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attemptSuccess, setAttemptSuccess] = useState(false);

    useEffect(() => {
        const attemptLogin = async () => {
            try {
                //1. check if already authenticated and info is present in redux store
                if(auth.isAuthenticated) {
                    setIsAttemptingLogin(false);
                    setAttemptSuccess(true);
                    return;
                }

                //check if cookie of accessToken is present
                const oldAccessTokenCookie = jsCookie.get("accessToken");
                if(oldAccessTokenCookie) {
                    // Attempt to refresh the access token
                    const response = await axiosWithCredentials.post(API.AUTH.REFRESH_ACCESS_TOKEN);
                    
                    if(response.status === 200) {
                        // store accessToken and user info in redux store
                        dispatch(setAuthState({isAuthenticated: true, accessToken: response.data.accessToken}));
                        dispatch(setUser({...response.data.user}));
                        
                        setIsAttemptingLogin(false);
                        setAttemptSuccess(true);
                    } else {
                        setError("Failed to refresh access token");
                        setIsAttemptingLogin(false);
                        setAttemptSuccess(false);
                        router.push("/log-in");
                    }
                } else {
                    // No access token cookie found
                    setIsAttemptingLogin(false);
                    setAttemptSuccess(false);
                    router.push("/log-in");
                }
            } catch (error) {
                console.error("Login attempt failed:", error);
                setError(error instanceof Error ? error.message : "Login attempt failed");
                setIsAttemptingLogin(false);
                setAttemptSuccess(false);
                router.push("/log-in");
            }
        };

        attemptLogin();
    }, [auth.isAuthenticated, dispatch, router]);

    return {
        isAttemptingLogin,
        error,
        attemptSuccess,
    };
}