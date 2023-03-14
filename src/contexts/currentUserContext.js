import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/AxiosDefaults";
import { Navigate } from "react-router-dom";

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
        };

        //start handle mount on mount.
        useEffect(() => {
            handleMount();
        }, []);



        return (
            <CurrentUserContext.Provider>
                <SetCurrentUserContext.Provider>
                    {children}
                </SetCurrentUserContext.Provider>
            </CurrentUserContext.Provider>
        )
    }


}
