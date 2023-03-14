import React, { createContext, useState, useEffect } from 'react'
import { axiosAuth } from '../api/AxiosDefaults';


//create a context object
const AuthContext = createContext();


//create an auth Provider to use when wrapping the constext object.
function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)



    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext} ;