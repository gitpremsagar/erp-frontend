import { axiosWithCredentials } from "../api/custom-axios-request";
import { API } from "../constants";

export const authServices = {
    logOut: async () => {
        try {
            const response = await axiosWithCredentials.post(API.AUTH.LOGOUT);
            return response.data;

        } catch (error) {
            console.error('Error logging out:', error);
            return null;
        }
    },
};
