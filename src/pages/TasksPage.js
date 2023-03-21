import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import TaskCreateForm from '../components/TaskCreateForm';
import TasksListComponent from '../components/TasksListComponent';
import UserTaskListComp from '../components/UserTaskListComp';
import { useTasks } from '../contexts/TasksContext';


function TaskPage() {
    const tasksUpdate = useTasks()

    return (
        <>
            <h1>Hello from tasksPage!</h1>

            <UserTaskListComp tasksUpdate={tasksUpdate} />

        </>
    )
}

export default TaskPage