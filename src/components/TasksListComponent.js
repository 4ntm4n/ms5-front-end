import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Task from './Task';
import { useTask } from '../hooks/useTask'; 

function TasksListComponent({}) {
    const {tasks, fetchTasks } = useTask();

    const handleMount = async () => {
        try {
            fetchTasks();

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        tasks && handleMount();
    }, []);


    return (
        <> 
            {tasks.length && tasks.map(task => (   
                <Task key={task.id} task={task} /> 
            ))}
        </>
    )
}

export default TasksListComponent