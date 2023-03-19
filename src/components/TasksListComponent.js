import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Task from './Task';

function TasksListComponent({tasksUpdated}) {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/tasks/')
            console.log(data.results)
            setTasks(data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTasks();
    }, [tasksUpdated]);

    return (
        <> 
            {tasks.length && tasks.map(task => (   
                <Task key={task.id} task={task} /> 
            ))}
        </>
    )
}

export default TasksListComponent