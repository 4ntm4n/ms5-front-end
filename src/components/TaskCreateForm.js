import axios from 'axios';
import { Alert } from 'react-bootstrap';
import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { axiosReq } from '../api/AxiosDefaults';
import { useTasksUpdate } from '../contexts/TasksContext';


function TaskCreateForm({ id }) {
  const taskListUpdate = useTasksUpdate();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [errors, setErrors] = useState({})
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
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      owning_group: id,
      owner: null,
      in_progress: false,
      completed: false,
    }
    //console.log("create form has been filled out... ", taskPayload)
    try {
      //console.log("create form is trying to submit...")
      await axiosReq.post('/tasks/create/', taskPayload)
      taskListUpdate()
    } catch (error) {
      console.log(error.response)
      setErrors(error.response?.data)
    }
  }

  return (
    <>

      <Form onSubmit={handleCreate}>
        <Form.Group className="mb-3" controlId="taskTitle">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            placeholder="task title"
            name="taskTitle"
            ref={titleRef}
          />
        </Form.Group>
        {errors.title?.map((message, index) => (
          <Alert key={index} variant='danger'> {message}</Alert>
        ))}

        <Form.Group className="mb-3" controlId="taskDescription">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            placeholder="task description"
            name="taskDescription"
            ref={descriptionRef}
          />
        </Form.Group>
        {errors.non_field_errors?.map((message, index) => {
          if (message === "The fields owning_group, title must make a unique set.") {
            message = "There is already a task with this title in this group :)"
          }

         return <Alert key={index} variant='danger'> {message}</Alert>
        })}
        <Button type="submit">Create new task</Button>
      </Form>

    </>

  )
}

export default TaskCreateForm