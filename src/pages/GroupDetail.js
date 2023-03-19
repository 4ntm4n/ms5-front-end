import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import { axiosReq } from '../api/AxiosDefaults';
import GroupMembers from '../components/GroupMembers';
import ProfilePic from '../components/ProfilePic';
import TaskCreateForm from '../components/TaskCreateForm';
import TasksListComponent from '../components/TasksListComponent';

function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [tasksUpdated, setTasksUpdated] = useState(false);

    const fetchGroup = async () => {
        try {
            const { data } = await axiosReq.get(`/groups/${id}/`)
            setGroup( data )
            
            console.log(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGroup();
    }, [tasksUpdated]);

    const handleTaskListUpdate = () => {
        console.log("handleTaskListUpdate called!")
        setTasksUpdated(prevTasksUpdated => !prevTasksUpdated)
    }


  return (
    <>  
        <h1>Hello from Group Detail Page!</h1>
        {!isLoading && group.group_owner.owner} is my name <br/>
        {!isLoading && group.name}, is the group name <br/>
        {!isLoading &&  <GroupMembers group={group} size={70} />}  <br/>
        <TasksListComponent tasksUpdated={tasksUpdated} /> <br />
        <TaskCreateForm id={id} taskAdded={handleTaskListUpdate} />
        <>add remove task from this group functionality, if owner </> <br />
        <>link to task details</>
    </>
  )
}

export default GroupDetail