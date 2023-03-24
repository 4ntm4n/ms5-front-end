import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { axiosReq } from '../api/AxiosDefaults';



function TaskUpdateForm({task}) {
    const [taskPayload, setTaskPayload] = useState({
        title: task.title,
        description: task.description,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskPayload((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosReq.patch(`/tasks/${task.id}/`, taskPayload)
        } catch (error) {
            console.log("error in task update. ", error)
        }
    }

    return (
        <Form >
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={taskPayload.title}
              onChange={handleChange}
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={taskPayload.description}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
    
          <Button variant="primary" type="submit">
            Update Task
          </Button>
        </Form>
      );
}

export default TaskUpdateForm