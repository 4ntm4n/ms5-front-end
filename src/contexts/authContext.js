import React, { createContext, useState } from 'react'


//create a context object
const AuthContext = createContext();


//create an auth Provider to use when wrapping the constext object.
function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    /* 
    *
    * add login functionalty that takes the token recieved as a reponse from
    * the login request to dj-rest-auth/login, and stores it in localStorage
    * then it sets the sets the 'isAuthenticated' value to true.
    */
   
    const login = (token) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider