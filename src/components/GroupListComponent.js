import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/currentUserContext'
import ProfilePic from './ProfilePic';
import GroupMembers from './GroupMembers';
import { axiosReq, axiosRes } from '../api/AxiosDefaults';

function GroupListComponent({refresh}) {
    const currentUser = useCurrentUser();
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        try {
            const { data } = await axiosRes.get('/groups/')
            //console.log(data.results)
            setGroups(data.results)
        } catch (error) {
            //console.log(error)
        }
    }
    useEffect(() => {
        currentUser && fetchGroups();
        //console.log(groups)
    }, [currentUser, refresh]);


    return (
        <>
            {groups.length ? (
                groups.map(group => (
                    <Card key={group.id} border="dark" style={{ width: '30rem', minHeight: '5rem' }} >
                        <Card.Header >{group.id}</Card.Header>
                        <Card.Body>
                            <Card.Title>{group.name}</Card.Title>
                            <Card.Text>
                                {group.description}
                            </Card.Text>
                        </Card.Body>
                        <GroupMembers group={group} /> 
                        <div>
                            <p>group owner</p>
                            {/* map through the members and extract the group owner */}
                            <ProfilePic key={group.id + group.group_owner.id} member={group.group_owner} size={70} />
                            
                        </div>
                        <Button as={Link} to={`${group.id}`}> Group Details</Button>
                    </Card>
                ))
            ) : (<h1>loading...</h1>)}
        </>
    )
}

export default GroupListComponent