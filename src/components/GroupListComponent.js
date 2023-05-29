import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/currentUserContext'
import ProfilePic from './ProfilePic';
import GroupMembers from './GroupMembers';
import { axiosReq, axiosRes } from '../api/AxiosDefaults';
import styles from '../styles/GroupCard.module.css'


function GroupListComponent({ refresh, handleRefresh, setErrors }) {
    const currentUser = useCurrentUser();
    const [groups, setGroups] = useState([]);


    const fetchGroups = async () => {
        try {
            const { data } = await axiosRes.get('/groups/')
            //console.log(data.results)
            setGroups(data.results)
        } catch (error) {
            console.log(error)
            setErrors(error.response?.data)
        }
    }

    useEffect(() => {
        currentUser && fetchGroups();
        //console.log(groups)
    }, [currentUser, refresh]);


    const handleDelete = async (id) => {
        console.log("delete group # ", id)
        try {
            await axiosRes.delete(`/groups/${id}`)
            handleRefresh()
        } catch (error) {
            console.log(error)
            setErrors(error.response?.data)
        }
    }

    return (
            <Row>
            {groups.length ? (
                groups.map(group => (

                
                    <Col  key={group.id} className="gy-4">
                         <Link to={`${group.id}`} className={styles.link}>
                        <Card  border="dark" style={{ width: '30rem', minHeight: '5rem' }} >

                            <Card.Header >{group.id}</Card.Header>
                            <Card.Body>
                                <Card.Title className='mb-5'>{group.name}</Card.Title>
                                <Card.Text>
                                    {group.description}
                                </Card.Text>
                            </Card.Body>


                            <Container fluid className="px-0">
                                <Row className="d-flex align-items-center justify-content-between px-0">
                                    <Col className="px-0"> 
                                        <div>
                                            {/* map through the members and extract the group owner */}
                                            <ProfilePic
                                                key={group.id + group.group_owner.id}
                                                member={group.group_owner}
                                                size={70} />
                                        </div>
                                    </Col>
                                    <Col className="px-0">
                                        <GroupMembers group={group} size={40} />
                                    </Col>
                                </Row>
                            </Container>

                            <Button variant="danger" onClick={() => handleDelete(group.id)}> Delete</Button>
                        </Card>
                    </Link>
                    </Col>
                   

                ))
            ) : (<h1>loading...</h1>)}
            </Row>
    )
}

export default GroupListComponent