import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/AxiosDefaults";
import { useNavigate } from "react-router-dom";
import { setTokenTimestamp, shouldRefreshToken, removeTokenTimestamp } from "../utils/utils";

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);


export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate() //instead of history in router-dom v6


    

    // set currentUser state to object returned from dj-rest-auth user.
    const handleMount = async () => {

        try {
            const { data } = await axiosRes.get('dj-rest-auth/user/')
            setCurrentUser(data);
        } catch (error) {
            //console.log(error)
        }
    }
    //start handle mount on mount.
    useEffect(() => {
        handleMount();
    }, []);

    
    const handleLogin = async (loginPayLoad) => {
        try {
            //console.log("try to fetch user")
            const { data } = await axiosReq.post('/dj-rest-auth/login/', loginPayLoad)
            setCurrentUser(data);
            setTokenTimestamp(data);
            navigate(-1)
        } catch (error) {
            //console.log("fetch user error", error)
        }
    }

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                        //console.log("token is about to refresh...")
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                return navigate('/login');
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
                            navigate('/login')
                            return null;
                            
                        });
                        removeTokenTimestamp();
                    }
                    return axios(error.config);
                }
                return Promise.reject(error);
                
            }
            
        );
    }, [navigate]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={{ handleLogin, setCurrentUser }}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}


