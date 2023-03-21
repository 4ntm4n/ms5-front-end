import React, { useEffect, useState } from 'react'
import { axiosRes } from '../api/AxiosDefaults';
import Task from './Task';


function TasksListComponent() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await axiosRes.get('/tasks/');
            setTasks(data.results)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTasks();
        
    },[])

    return (
        <>
            {tasks.length ? (tasks.map(task => (   
                <Task key={task.id} task={task} /> 
            ))) : ("loading...") }
        </>
    )
}

export default TasksListComponent