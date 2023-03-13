import React, { createContext, useState } from 'react'


//create a context object
const AuthContext = createContext();


//create an auth Provider to use when wrapping the constext object.
function AuthProvider({children}) {
    const [isAuthenticated, SetIsAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider