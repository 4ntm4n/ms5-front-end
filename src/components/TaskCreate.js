import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/currentUserContext'

function TaskCreate() {
    const currentUser = useCurrentUser();
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [payLoad, setPayload] = useState(null)
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

    const handleCreate = (e) => {
        e.preventDefault();
        const taskPayload = {
          owning_group: "set this next",
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        }
        setPayload(taskPayload)
        console.log(taskPayload)
        navigate("/")
    }

    useEffect(() => {
      
    }, [payLoad]);

    return (
    <>
    
    <form onSubmit={handleCreate}>
      <label for="taskTitle" >Task Title: </label>
      <input placeholder="task title" id="taskTitle" name="taskTitle" ref={titleRef}></input> <br/>

      <label for="taskDescription">Task desc:</label>
      <textArea placeholder="task description" id="taskDescription" name="taskDescription" ref={descriptionRef}></textArea> <br />
      <Button type="submit">add task</Button>
    </form>

      <p> payload: {payLoad? (<>{payLoad.title} <br /> {payLoad.description} </>):("no payload yet")}</p>
    </>

  )
}

export default TaskCreate