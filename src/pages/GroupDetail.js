import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq, axiosRes } from '../api/AxiosDefaults'
import GroupMembers from '../components/GroupMembers';
import ProfilePic from '../components/ProfilePic';


function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchGroup = async () => {
        try {
            const { data } = await axiosReq.get(`/groups/${id}/`)
            setGroup( data )
            setIsLoading(false)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchGroup();
        
    }, [id]);


  return (
    <>  
        
        <h1>Hello from Group Detail Page!</h1>
        {!isLoading && group.group_owner.owner} is my name <br/>
        {!isLoading && group.name}, is the group name <br/>
        {!isLoading &&  <GroupMembers group={group} />}  <br/>
        <> Members component</> <br />
        <>list of tasks components belonging to group</> <br />
        <>add new task to this group functionality to this specific group</> <br />
        <>add remove task to this group functionality </> <br />
        <>link to task details</>
        
    </>
  )
}

export default GroupDetail