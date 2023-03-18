import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/AxiosDefaults';
import { useCurrentUser } from '../contexts/currentUserContext'

function TaskCreate() {
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
        const taskPl = {
          owning_group: 8,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        }
        console.log("form has been filled out...")
        setTasks(taskPl)
        console.log(taskPl)
        try {
          console.log("form is trying to submit...")
          await axiosRes.post('/tasks/create/', taskPl)
          
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
    
    <form onSubmit={handleCreate}>
      <label for="taskTitle" >Task Title: </label>
      <input placeholder="task title" id="taskTitle" name="taskTitle" ref={titleRef}></input> <br/>

      <label for="taskDescription">Task desc:</label>
      <textArea placeholder="task description" id="taskDescription" name="taskDescription" ref={descriptionRef}></textArea> <br />
      <Button type="submit">add task</Button>
    </form>

      <p> tasks: {tasks? (<>{tasks.title} <br /> {tasks.description} </>):("no tasks yet")}</p>
    </>

  )
}

export default TaskCreate