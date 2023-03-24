import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { axiosReq } from '../api/AxiosDefaults'
import { useCurrentUser } from '../contexts/currentUserContext';
import { useTasksUpdate } from '../contexts/TasksContext'
import { v4 as uuidv4 } from 'uuid';
import TaskUpdateForm from './TaskUpdateForm';

function Task({ task }) {
    const currentUser = useCurrentUser();
    const taskListUpdate = useTasksUpdate();
    const taskid = uuidv4();

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
    if (!payload.in_progress && e.target.name==="claim") {
      payload.in_progress = true
    }
    try {
        await axiosReq.put(`/tasks/${id}/`, payload)
        taskListUpdate()
    } catch (error) {
    }
}   

const handlComplete = async (e) => {
  if (payload.in_progress && e.target.name==="complete") {
      payload.completed = true
  }
  try {
      await axiosReq.put(`/tasks/${id}/`, payload)
      taskListUpdate()
  } catch (error) {
  }
} 

 
  return (
         <Card key={taskid} border="warning" >
            
            <Card.Title>{title}</Card.Title>
            <Card.Body>
                <h5>task id {id}</h5>
                {description}
            </Card.Body>
            {in_progress? (
              <>
                <p>{owner_name}</p>
                <Button 
                  name="complete" 
                  variant="warning" 
                  onClick={(e) => handleUpdate(e)}>
                  complete task
                </Button>
              </>
            ): (
            <Button 
              name="claim" 
              variant="primary" 
              onClick={(e) => handleUpdate(e)}>
              take ownership
            </Button>)}
            
            <span>mark as complete</span>
            <span></span>
            <Button variant="danger" onClick={handleDelete}>delete forever</Button>
            <TaskUpdateForm task={task}/>
        </Card>
  )
}

export default Task