import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';


//creates context that can be used to store current user context
//and define the function that sets / updates the user context
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


/**
* Creates custom hooks by extending useContext hook.
* The CurrentUserContext data and setter function are 
  then passed into the custom context hooks to give access to the
  functionality in other parts of the application.
* Without these hooks, you would need to pass the 
  CurrentUserContext and setter functions manually to 
  child components throughout the app.
*/
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);


export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const history = useHistory();

    //function that tries to fetch user data from the database.
    const handleMount = async () => {
        try {
            //try to extract the data-key value from axios get response.
            const { data } = await axiosRes.get('dj-rest-auth/user/')
            //add response data value to the currentUser state.
            setCurrentUser(data)
        } catch (error) {
            console.log(error);
        }
    };

    //call the handlemount() once when this component mounts. 
    useEffect(() => {
        handleMount();
    }, []);

    //nesting setCurrentContext function inside CurrentUserContext data
    //to give access to both the functuin and the setter. 
    // the { children } prop represents all components that will be
    //wrapped inside the CurrentUserProvider function.
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                { children }
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}
