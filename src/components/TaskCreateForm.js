import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/AxiosDefaults';
import { useCurrentUser } from '../contexts/currentUserContext'

function TaskCreateForm({id, taskAdded}) {
    const currentUser = useCurrentUser();
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [tasks, setTasks] = useState(null)
    const navigate = useNavigate();
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

    //handle data put into the "create task form" and package it as a tasks.
    const handleCreate = async (event) => {
        event.preventDefault();
        const taskPayload = {
          owning_group: id,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        }
        console.log("form has been filled out...")
        setTasks(taskPayload)
        console.log(taskPayload)
        try {
          console.log("form is trying to submit...")
          await axiosRes.post('/tasks/create/', taskPayload)
          taskAdded()
        } catch (error) {
          console.log(error)
        }
    }

    // this is executed if the tasks is updated and is not "null"
    useEffect(() => {
      tasks &&  console.log("tasks was updated correctly...")
    }, [tasks]);

    return (
    <>
    
    <Form onSubmit={handleCreate}>
      <Form.Group className="mb-3" controlId="taskTitle">
        <Form.Label>Task Title</Form.Label>
        <Form.Control 
          placeholder="task title" 
          id="taskTitle" 
          name="taskTitle" 
          ref={titleRef} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="taskDescription">
        <Form.Label>Task Title</Form.Label>
        <Form.Control 
          placeholder="task description" 
          id="taskDescription" 
          name="taskDescription" 
          ref={descriptionRef} 
        />
      </Form.Group>
      <Button type="submit">Create new task</Button>
    </Form>

      <p> tasks: {tasks? (<>{tasks.title} <br /> {tasks.description} </>):("no tasks yet")}</p>
    </>

  )
}

export default TaskCreateForm