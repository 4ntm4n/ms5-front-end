import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios';


function SignupPage() {
  const usernameRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password1 = password1Ref.current.value;
    const password2 = password2Ref.current.value;
    //console.log({ username, password1, password2 });

    const signupPayLoad = {
        username,
        password1,
        password2,
    }

    try {
        await axios.post(
          '/dj-rest-auth/registration/', signupPayLoad
        )
        //console.log(data)
        navigate('/login')
    } catch (error) {
        setErrors(error.response?.data)
    }

  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" ref={usernameRef} />
      </Form.Group>
      {errors.username?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={password1Ref} />
      </Form.Group>
      {errors.password1?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={password2Ref} />
      </Form.Group>
      {errors.password2?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
  );
}


export default SignupPage