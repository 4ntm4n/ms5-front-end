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
    }, [], [groups]);


    return (
        <>
            {groups.length ? (
                groups.map(group => (
                    <Card border="dark" style={{ width: '30rem', height: '25rem' }} >
                        <Card.Header >{group.id}</Card.Header>
                        <Card.Body>
                            <Card.Title>{group.name}</Card.Title>
                            <Card.Text>
                                {group.description}
                            </Card.Text>
                        </Card.Body>
                        <div>
                            <p>members</p>
                            {group.members.map((member) =>
                                !member.is_owner && (
                                    <h2 style={{ color: 'red' }}>{member.owner}</h2>
                                )
                            )}
                        </div>
                        <div>
                            <p>group owner</p>
                            {group.members.map((member) =>
                                member.is_owner && (
                                    <h2 style={{ color: 'red' }}>{member.owner}</h2>
                                )
                            )}
                        </div>
                    </Card>
                ))
            ) : (<h1>"loading..."</h1>)}
        </>
    )
}

export default GroupComponent