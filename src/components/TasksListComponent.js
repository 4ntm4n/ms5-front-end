import React, { useEffect, useState } from 'react'
import { axiosRes } from '../api/AxiosDefaults';
import Task from './Task';

function TasksListComponent({ tasksUpdate, id}) {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await axiosRes.get(`/tasks/?owning_group__id=${id}`);
            setTasks(data.results)
            console.log("tasksList component: ", data.results)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTasks()
    }, [tasksUpdate])

    return (
        <>
            {tasks.length ? (tasks.map(task => (   
                <Task key={task.id} task={task} /> 
            ))) : ("loading...") }
        </>
    )
}

export default TasksListComponent