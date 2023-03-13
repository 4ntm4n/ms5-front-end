import React, { createContext, useState } from 'react'
import { axiosAuth } from '../api/AxiosDefaults';


//create a context object
const AuthContext = createContext();


//create an auth Provider to use when wrapping the constext object.
function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    /* 
    *
    * add login functionalty that takes the token recieved as a reponse from
    * the login request to dj-rest-auth/login, and stores it in localStorage
    * then it sets the sets the 'isAuthenticated' value to true.
    */

    const login = async (token) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)

        try {
            const { data } = await axiosAuth.get('dj-rest-auth/user/')
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    // on logout the authProvider can be set to false. 
    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext} ;