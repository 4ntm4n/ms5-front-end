import { createContext, useContext} from 'react'
import TaskContext from '../contexts/TaskContext'
import { TaskProvider } from '../contexts/TaskContext'

export const useTask = () => {
    const context = useContext(TaskContext);

    const fetchTask = async (taskId) => {
        try {
            await axios.get(`/tasks/${taskId}/`)
        } catch (error) {
            console.log(error)
        }
    };
}
