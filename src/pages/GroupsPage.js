import React, { useState, useEffect } from 'react'
import GroupCreateForm from '../components/GroupCreateForm'
import GroupListComponent from '../components/GroupListComponent'

function GroupsPage() {
    const [refresh, setRefresh] = useState(false)

    const handleRefresh = () => {
        console.log("updating groupslist after create")
        setRefresh(prevRefresh => !prevRefresh)
    }


    return (
        <>
            <h1>Hello from GroupsPage</h1>
            <GroupCreateForm handleRefresh={handleRefresh} />
           <GroupListComponent refresh={refresh} /> 
        </>
    )
}

export default GroupsPage