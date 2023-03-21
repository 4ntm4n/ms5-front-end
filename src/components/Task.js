import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { axiosReq } from '../api/AxiosDefaults'
import { useTasksUpdate } from '../contexts/TasksContext'

function Task({ task }) {
    const taskListUpdate = useTasksUpdate();

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

    const handleDelete = async () => {
      try {
          await axiosReq.delete(`/tasks/${id}`)
          taskListUpdate()
      } catch (error) {
          console.log(error)
      }   
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