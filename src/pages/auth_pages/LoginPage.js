import React, { useRef, useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { axiosReq } from '../../api/AxiosDefaults'
import { useSetCurrentUser } from '../../contexts/currentUserContext'
import { useRedirect } from '../../hooks/useRedirect'
import { setTokenTimestamp } from "../../utils/utils";

function LoginPage() {
  useRedirect("loggedIn");
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const setCurrentUser = useSetCurrentUser();

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    //console.log({ username, password1, password2 });

    const loginPayLoad = {
      username,
      password,
    }
    try {
      //console.log("try to fetch user")
      const { data } = await axiosReq.post('/dj-rest-auth/login/', loginPayLoad)
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate(-1)
    } catch (error) {
      setErrors(error.response?.data)
    }
  }

  return (

    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="username" ref={usernameRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" ref={passwordRef} />
      </Form.Group>
      {errors.title?.map((message, index) => (
        <Alert key={index} variant='danger'> {message}</Alert>
      ))}

      {errors.non_field_errors?.map((message, index) => (
        <Alert key={index} variant='danger'> {message}</Alert>
      ))}
      <Button variant="dark" type="submit"> Log in </Button>
    </Form>

  )
}

export default LoginPage