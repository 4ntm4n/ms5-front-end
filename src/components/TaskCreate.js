import React, { useRef, useState } from 'react'
import { useCurrentUser } from '../contexts/currentUserContext'

function TaskCreate() {
    const currentUser = useCurrentUser();
    const [taskPayload, setTaskPayload] = useState();
    const title = useRef('');
    const description = useRef('');
    /* 
       enpoint: /tasks/create/
       accepts:
    {
        "title": "",
        "description": "",
        "owning_group": null,
        "owner": null,
        "in_progress": false,
        "completed": false

        note. Only set title description and owning group.
              in progress will be handled auto from the 
              backend when onwner is set.this will be done 
              from done from the task itself by a user at 
              a later stage.
    } */

    const handleCreate = () => {
        
    }

    return (
    <div>TaskCreate</div>
  )
}

export default TaskCreate