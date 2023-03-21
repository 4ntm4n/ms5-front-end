import { createContext, useContext, useState } from "react"

const TasksContext = createContext();
const TasksUpdateContext = createContext()

export const TasksProvider = ({ children }) => {
    //to toggle when task is updating and let parent components know
    const [tasksUpdate, setTasksUpdate] = useState(true)

    
    const toggleUpdate = () => {
        setTasksUpdate(prevTasksUpdate => !prevTasksUpdate)
    }

    return (
        <TasksContext.Provider value={tasksUpdate}>
            <TasksUpdateContext.Provider value={toggleUpdate}>
                {children}
            </TasksUpdateContext.Provider>
        </TasksContext.Provider> 
    )
}

