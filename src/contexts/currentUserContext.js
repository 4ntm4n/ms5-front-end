import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/AxiosDefaults";
import { Navigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);


export const currentUserContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = Navigate() //instead of history in router-dom v6


    // set currentUser state to object returned from dj-rest-auth user.
    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get('dj-rest-auth/user/')
            setCurrentUser(data);
        } catch (error) {
            console.log(error)
        }
    }
    //start handle mount on mount.
    useEffect(() => {
        handleMount();
    }, []);

    const handleLogin = async (loginPayLoad) => {
        try {
          const { data } = await axios.post('/dj-rest-auth/login/', loginPayload)
        } catch (error) {
            console.log(error)
        }
    }

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate('/login');
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosRes.interceptors.response.use(
            (response) => response, async (error) => {
                if (error.response?.status === 401) {
                    try {
                        await axios.post('dj-rest-auth/token/refresh/')
                    } catch (error) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate('/login')
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    return axios(error.config);
                }
                return Promise.reject(error);
            }
        );
    }, [history]);

    return (
        <CurrentUserContext.Provider>
            <SetCurrentUserContext.Provider>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}


