import React from 'react'
import GroupCreateForm from '../components/GroupCreateForm'
import GroupListComponent from '../components/GroupListComponent'

function GroupsPage() {
    return (
        <>
            <h1>Hello from GroupsPage</h1>
            <GroupCreateForm />
           <GroupListComponent /> 
        </>
    )
}

export default GroupsPage