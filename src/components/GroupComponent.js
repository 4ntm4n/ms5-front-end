import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
// import { useCurrentUser } from '../contexts/currentUserContext'
import { axiosReq } from '../api/AxiosDefaults';
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
    },[], [groups]);


  return (
    <>
        
        <Card border="dark"  style={{width: '18rem'}} >
            <Card.Header >Group Name</Card.Header>
            <Card.Body>
                <Card.Title> Some Title</Card.Title>
                <Card.Text>Description of group if you have one. <br />
                    else display a standard text.
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default GroupComponent