import { createContext, useContext, useState } from "react"

const TasksContext = createContext();
const TasksUpdateContext = createContext()

export const useTasks = () => useContext(TasksContext)
export const useTasksUpdate = () => useContext(TasksUpdateContext)

export const TasksProvider = ({ children }) => {
    //state to store tasks globally and not fetch from the server every time
    const [tasks, setTasks] = useState([]);
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

