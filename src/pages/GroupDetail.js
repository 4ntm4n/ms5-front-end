import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import TaskCreateForm from '../components/TaskCreateForm';
import TasksListComponent from '../components/TasksListComponent';
import { useTasks } from '../contexts/TasksContext';


function GroupDetail() {
    const tasksUpdate = useTasks()
    const { id } = useParams();
    
  return (
    <>  
        <h1>Hello from Group Detail Page!</h1>

        <TasksListComponent groupId={id} tasksUpdate={tasksUpdate} /> 
        <TaskCreateForm id={id}  />

    </>
  )
}

export default GroupDetail