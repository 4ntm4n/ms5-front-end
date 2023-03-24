import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';



function TaskUpdateForm({task}) {
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
    });


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