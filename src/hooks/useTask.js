import { useContext } from 'react'
import { axiosReq } from '../api/AxiosDefaults'
import { useTasks } from '../contexts/TaskContext';

export const useTask = () => {
    const { tasks, setTasks } = useTasks();

    const fetchTask = async (taskId) => {
        try {
            await axiosReq.get(`/tasks/${taskId}/`)
        } catch (error) {
            console.log(error)
        }
    };

   
    const fetchTasks = async () => {
        try {
            const { data } = await axiosReq.get('/tasks/');
            console.log("data being set: ", data)
            setTasks(data.results)
        } catch (error) {
            console.log(error)
        }
    };

    const updateTaskList = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask])
    }

    /* 
    *
    * updates the list of tasks that this hook should re-render, 
    * setting a new tasks list to the Tasks contexts that excludes
    * the task that you provided an id for. 
    * 
    * this will hopefully reduce number of requests and refreshes to the backend
    * and speed up the application a lot.
    */

    const deleteTaskFromList = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    }

    /* 
    *
    * these are the commands I will be able to use with this hook.
    * useTasks and setTasks are interacting with the TasksContext Provider.
    * While fetchTask, UpdateTasksList and DeleteTasks are all methods
    * that should be called from the same auth part of the application. 
    * this is so that there wont be calls from different parts of the
    *  app and each component can have on specific job. 
    * 
    * these methods, along with setting up the taskContexts in contexts,
    * should allow me to save all tasks in a state that is being manipulated
    * rather than having to fetch data on every object from the server
    * and couase tons of token refresh firings from the axios interceptops..
    * That's my idea at least.
    
    */
    return {
        tasks,
        setTasks,
        fetchTask,
        fetchTasks,
        updateTaskList,
        deleteTaskFromList,
    };
}
