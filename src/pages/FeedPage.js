import React, { useState, useEffect } from 'react'
import { axiosRes } from '../api/AxiosDefaults';
import Task from '../components/Task';
import { useTasks } from '../contexts/TasksContext';


function FeedPage() {
    const [tasks, setTasks] = useState([]);
    const tasksUpdate = useTasks()

    const fetchTasks = async () => {
        try {
            const { data } = await axiosRes.get('/tasks/events/');
            setTasks(data.results)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTasks();
    },[tasksUpdate])

    return (
        <>
            {tasks.length ? (tasks.map(task => (   
                <Task key={task.id} task={task} /> 
            ))) : ("loading...") }
        </>
    )
}

export default FeedPage