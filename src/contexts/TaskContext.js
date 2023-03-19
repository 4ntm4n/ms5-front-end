import { createContext, useContext, useEffect, useState } from "react"

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
    const [taskListChange, setTaskListChange] = useState(false)

    const handleTaskListUpdate = () => {
        setHasChanged(prevHasChanged => !prevHasChanged)
    }

    const value = {
        tasks,
        setTasks,
    }

    return (
        <TaskContext.Provider value={{tasks, setTasks, handleTaskListUpdate}}>
            {children}
        </TaskContext.Provider> 
    )
}

