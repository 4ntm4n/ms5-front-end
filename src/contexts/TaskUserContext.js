import { createContext, useContext } from "react"

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