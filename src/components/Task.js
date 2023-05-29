import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Row,
} from 'react-bootstrap';
import { axiosReq, axiosRes } from '../api/AxiosDefaults';
import { useCurrentUser } from '../contexts/currentUserContext';
import { useTasksUpdate } from '../contexts/TasksContext';
import { v4 as uuidv4 } from 'uuid';
import TaskUpdateForm from './TaskUpdateForm';
import ProfilePic from './ProfilePic';
import { Trash, CaretDownFill, CaretUpFill, PencilSquare } from 'react-bootstrap-icons';

function Task({ task }) {
  const currentUser = useCurrentUser();
  const taskListUpdate = useTasksUpdate();
  const taskid = uuidv4();

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleMoreInfo = () => {
    setShowMoreInfo((prevState) => !prevState);
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm((prevState) => !prevState);
  };


  const {
    id,
    title,
    description,
    owner, //object
    owner_profile_image,
    in_progress,
    completed,
    updated_at,
    owning_group,
  } = task

  const payload = {
    title: task.title,
    description: task.description,
    owning_group: task.owning_group,
    owner: task.owner,
    in_progress,
    completed,
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`)
      taskListUpdate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (e) => {
    if (!payload.in_progress && e.target.name === "claim") {
      payload.in_progress = true
    }
    try {
      await axiosRes.patch(`/tasks/${id}/`, payload)
      taskListUpdate()
    } catch (error) {
      console.log(error)
    }
  }


  //refactor this later to put logic inside handleUpdate and remove this code.
  const handleComplete = async (e) => {
    if (payload.in_progress && e.target.name === "complete") {
      payload.completed = true
    }

    try {
      await axiosRes.patch(`/tasks/${id}/`, payload)
      taskListUpdate()
    } catch (error) {
    }
  }

  const handleTaskUpdated = () => {
    taskListUpdate();
  }
  /* <TaskUpdateForm task={task} onTaskUpdated={handleTaskUpdated}/> */

  return (
    <>
      <Card key={taskid}
        bg={
          in_progress
            ? "warning"
            : completed
              ? "secondary"
              : "light"
        }
        text={
          completed
            ? "light"
            : "dark"
        }
      >

        <Card.Header>
          <Container fluid>
            <Row>
              <Col className='d-flex justify-content-start align-items-center'>



                {completed ? (
                  null
                ) : in_progress ? (
                  <ProfilePic member={{ image: owner_profile_image }} />

                ) : (

                  <Button onClick={toggleUpdateForm} variant="secondary">
                    edit <PencilSquare />
                  </Button>

                )}
              </Col>

              <Col className='d-flex justify-content-center align-items-center'>
                {completed ? (
                  null
                ) : in_progress ? (
                  <Button
                    name="complete"
                    variant="dark"
                    onClick={(e) => handleComplete(e)}>
                    Completed
                  </Button>

                ) : (

                  <Button
                    name="claim"
                    variant="primary"
                    onClick={(e) => handleUpdate(e)}>
                    claim
                  </Button>

                )}
              </Col>

              <Col
                className='d-flex justify-content-end align-items-center'>
                <Button
                  onClick={handleDelete}
                  variant='danger'
                  size='sm'
                >
                  <Trash />
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Header>

        <Card.Title className="mt-4 d-inline-block">{title}</Card.Title>
        <Collapse in={showMoreInfo && !showUpdateForm}>
          <Card.Body>{description}</Card.Body>
        </Collapse>
        {showUpdateForm && (
          <TaskUpdateForm task={task} toggleUpdateForm={toggleUpdateForm} onTaskUpdated={handleTaskUpdated} />
        )}
        {!completed && description !== '' && (
          <Button onClick={toggleMoreInfo} variant="dark">
            {showMoreInfo ? <CaretUpFill /> : <CaretDownFill />}
          </Button>
        )}
        {completed && (
          <span>This task was completed on: {updated_at}</span>
        )}
      </Card>
    </>
  );
}
export default Task