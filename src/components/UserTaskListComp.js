import React, { useEffect, useState } from 'react'
import { axiosRes } from '../api/AxiosDefaults';
import { useCurrentUser } from '../contexts/currentUserContext';
import Task from './Task';

function UserTaskListComp({tasksUpdate}) {
    const [tasks, setTasks] = useState([]);
    const currentUser = useCurrentUser();
    
    const fetchTasks = async () => {
        try {
            const { data } = await axiosRes.get(`/tasks/?owner=${currentUser.profile_id}`);
            setTasks(data.results)
            
        } catch (error) {
            //console.log(error)
        }
    };

    useEffect(() => {
        currentUser && fetchTasks()
    }, [currentUser ,tasksUpdate])


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

export default UserTaskListComp