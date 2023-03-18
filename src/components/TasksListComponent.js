import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/AxiosDefaults';
import { useCurrentUser } from '../contexts/currentUserContext';

function TasksListComponent() {
    const currentUser = useCurrentUser();
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await axiosReq.get('/tasks/')
            console.log(data.results)
            setTasks(data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            {tasks.length && tasks.map(task => (
                <h1>{task.title}</h1>
            ))}
        </>
    )
}

export default TasksListComponent