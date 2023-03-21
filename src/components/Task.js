import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { axiosReq } from '../api/AxiosDefaults'
import { useCurrentUser } from '../contexts/currentUserContext';
import { useTasksUpdate } from '../contexts/TasksContext'

function Task({ task }) {
    const currentUser = useCurrentUser();
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

    const payload = {
      title: task.title,
      description: task.description,
      owning_group: task.owning_group,
      owner: task.owner,
      in_progress,
      completed,
    }

    const handleDelete = async () => {
      try {
          await axiosReq.delete(`/tasks/${id}`)
          taskListUpdate()
      } catch (error) {
          console.log(error)
      }   
  }

  const handleUpdate = async (e) => {
    if (payload.in_progress) {
      payload.completed = false
      payload.in_progress = false

    } else {
      payload.in_progress = true
    }
    try {
      const {data} = await axiosReq.put(`/tasks/${id}/`, payload)
      console.log(data.response)
      taskListUpdate()
    } catch (error) {
      console.log(error)
    }
    console.log("taking ownership :", id, "from user:", currentUser.profile_id)
}   

 
  return (
        <Card border="warning" >
            
            <Card.Title>{title}</Card.Title>
            <Card.Body>
                <h5>task id {id}</h5>
                {description}
            </Card.Body>
            {in_progress? (<p>{owner_name}</p>): (<Button name="claim" variant="primary" onClick={(e) => handleUpdate(e)}>take ownership</Button>)}
            
            <span>mark as complete</span>
            <span></span>

            <Button variant="danger" onClick={handleDelete}>delete forever</Button>
            
        </Card>
  )
}

export default Task