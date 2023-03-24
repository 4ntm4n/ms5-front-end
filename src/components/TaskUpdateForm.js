import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { axiosReq } from '../api/AxiosDefaults';



function TaskUpdateForm({task}) {
    const [taskPayload, setFormData] = useState({
        title: task.title,
        description: task.description,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosReq(`/tasks/${task.id}/`, taskPayload)
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
             
              
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              
            
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