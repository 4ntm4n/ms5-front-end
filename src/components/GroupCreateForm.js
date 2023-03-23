import axios from 'axios';
import { Alert } from 'react-bootstrap';
import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { axiosRes } from '../api/AxiosDefaults';
import { useTasksUpdate } from '../contexts/TasksContext';


function GroupCreateForm({handleRefresh}) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [errors, setErrors] = useState({})

/*   {
    "name": "",
      "description": ""
  } */

  //handle data put into the "create task form" and package it as a tasks.
   
  const handleCreate = async (event) => {
    event.preventDefault();
    const taskPayload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    }
    //console.log("create form has been filled out... ", taskPayload)
    try {
      //console.log("create form is trying to submit...")
      await axiosRes.post('/groups/', taskPayload)
      handleRefresh()
    } catch (error) {
      console.log(error.response)
      setErrors(error.response?.data)
    }
  }

  return (
    <>

      <Form onSubmit={handleCreate}>
        <Form.Group className="mb-3" controlId="groupName">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            placeholder="task title"
            name="groupName"
            ref={nameRef}
          />
        </Form.Group>
        {errors.name?.map((message, index) => (
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
          return <Alert key={index} variant='danger'> {message}</Alert>
        })}
        <Button type="submit">Create new Group</Button>
      </Form>

    </>

  )
}

export default GroupCreateForm