import { createContext, useContext, useState } from "react"

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    // if the useContext is tried to be used outside its provider,
    //this error will be thrown
    if (!context) {
        throw new Error('useTasks must be used within a TaskProider!')
    }

    return context;
}


export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);


    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider> 
    )
}

