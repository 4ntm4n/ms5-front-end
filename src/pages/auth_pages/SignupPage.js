import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

function SignupPage() {
  const usernameRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password1 = password1Ref.current.value;
    const password2 = password2Ref.current.value;
    console.log({ username, password1, password2 });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" ref={usernameRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={password1Ref} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={password2Ref} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
  );
}


export default SignupPage