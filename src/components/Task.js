import React from 'react'
import { Button, Card } from 'react-bootstrap'
function Task({ task }) {

    const {
        id,
        title,
        description,
        owner_name,
        owner_profile_image,
        in_progress,
        completed,
        owning_group,

    } = task

    const handleDelete = () => {
        console.log("delting task with id: ", id)
    }

  return (
        <Card border="warning" >
            
            <Card.Title>{title}</Card.Title>
            <Card.Body>
                <h5>task id {id}</h5>
                {description}
            </Card.Body>
            {in_progress? (<p>{owner_name}</p>): (<p>take ownership</p>)}
            
            <span>mark as complete</span>
            <span></span>

            <Button variant="danger" onClick={handleDelete}>delete forever</Button>
        </Card>
  )
}

export default Task