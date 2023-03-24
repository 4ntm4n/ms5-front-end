import { Alert, Container, Row, } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import GroupCreateForm from '../components/GroupCreateForm'
import GroupListComponent from '../components/GroupListComponent'

function GroupsPage() {
    const [refresh, setRefresh] = useState(false)
    const [errors, setErrors] = useState({})

    const handleRefresh = () => {
        console.log("updating groupslist after create")
        setRefresh(prevRefresh => !prevRefresh)
    }

    const handleSetErrors = (errorObj) => {
        setErrors(errorObj)
    }

    return (
        <>
            <h1>Hello from GroupsPage</h1>
            {errors.detail && (
                 <Alert variant='danger'>{
                    errors.detail === 'You do not have permission to perform this action.'
                    ? ("You can not delete a group you are not the owner of")
                    : (errors.detail)
                 }</Alert>
            )} 
            
            <Container>
                <Row>
                <GroupCreateForm handleRefresh={handleRefresh} />
                <GroupListComponent setErrors={handleSetErrors} handleRefresh={handleRefresh} refresh={refresh} />

                </Row>
            </Container>
        </>
    )
}

export default GroupsPage