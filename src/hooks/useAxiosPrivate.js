import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/user";

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.authToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                if (error?.response?.status === 401) {
                    navigate(from, { replace: true });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate;