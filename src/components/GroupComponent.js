import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
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
            {groups.length ? (
                groups.map(group => (
                    <Card key={group.id} border="dark" style={{ width: '30rem', height: '25rem' }} >
                        <Card.Header >{group.id}</Card.Header>
                        <Card.Body>
                            <Card.Title>{group.name}</Card.Title>
                            <Card.Text>
                                {group.description}
                            </Card.Text>
                        </Card.Body>
                        <div>
                            {/* map through the members and extract non group owners */}
                            <p>members</p>
                            {group.members.map((member) =>
                                !member.is_owner && (
                                    <ProfilePic key={group.id + member.id} member={member} size={50} />
                                )
                            )}
                        </div>
                        <div>
                            <p>group owner</p>
                            {/* map through the members and extract the group owner */}
                            <ProfilePic key={group.id + group.group_owner.id} member={group.group_owner} size={70} />
                        </div>
                    </Card>
                ))
            ) : (<h1>"loading..."</h1>)}
        </>
    )
}

export default GroupComponent