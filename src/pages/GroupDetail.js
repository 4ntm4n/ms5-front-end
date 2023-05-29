import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import { axiosRes } from '../api/AxiosDefaults';
import GroupMembers from '../components/GroupMembers';
import ProfileSearch from '../components/ProfileSearch';
import TaskCreateForm from '../components/TaskCreateForm';
import TasksListComponent from '../components/TasksListComponent';
import { useCurrentUser } from '../contexts/currentUserContext';
import { useTasks } from '../contexts/TasksContext';

function GroupDetail() {
    const currentUser = useCurrentUser()
    const tasksUpdate = useTasks()
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [membersChanged, setMembersChanged] = useState();


    const updateMembers = () => {
      setMembersChanged(prevMembersChanged => !prevMembersChanged)
    }


    const fetchGroup = async () => {
      try {
        const {data} = await axiosRes.get(`/groups/${id}/`)
        setGroup(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      currentUser && fetchGroup()
    }, [tasksUpdate, membersChanged]);



  return (
    <>  
        <h1>Hello from Group Detail Page!</h1>
        
        {group && <>
        <ProfileSearch groupObj={group} groupId={id} updateMembers={updateMembers} />
        <GroupMembers group={group} size={70} /> 
        </>
        }      
        <TasksListComponent id={id} tasksUpdate={tasksUpdate} /> 
        <TaskCreateForm id={id}  />

    </>
  )
}

export default GroupDetail