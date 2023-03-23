import React, { useRef, useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { axiosRes } from '../../api/AxiosDefaults'
import { useSetCurrentUser } from '../../contexts/currentUserContext'


function LoginPage() {
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const { handleLogin } = useSetCurrentUser();
  const [errors, setErrors] = useState({})

  useEffect(() => {
    //console.log()
  }, []);

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
      const { data } = await axiosRes.post('/dj-rest-auth/login/', loginPayLoad)
      handleLogin(data)
    } catch (error) {
      console.log('Error response:', error.response);
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