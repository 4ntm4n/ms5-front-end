import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import { axiosReq } from '../api/AxiosDefaults';
import GroupMembers from '../components/GroupMembers';
import ProfileSearch from '../components/ProfileSearch';
import TaskCreateForm from '../components/TaskCreateForm';
import TasksListComponent from '../components/TasksListComponent';
import { useTasks } from '../contexts/TasksContext';

function GroupDetail() {
    const tasksUpdate = useTasks()
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [membersChanged, setMembersChanged] = useState();


    const updateMembers = () => {
      setMembersChanged(prevMembersChanged => !prevMembersChanged)
    }


    const fetchGroup = async () => {
      try {
        const {data} = await axiosReq.get(`/groups/${id}/`)
        setGroup(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchGroup()
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