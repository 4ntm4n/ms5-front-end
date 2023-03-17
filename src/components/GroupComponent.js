import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
// import { useCurrentUser } from '../contexts/currentUserContext'
import { axiosReq } from '../api/AxiosDefaults';
import ProfilePic from './ProfilePic';

function GroupComponent() {
    /* const currentUser = useCurrentUser(); */
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        try {
            const { data } = await axiosReq.get('/groups/')
            console.log(data.results)
            setGroups(data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchGroups();
    }, [], [groups]);


    return (
        <>
           group detail component
        </>
    )
}

export default GroupComponent