import React, { useContext, useRef, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { axiosReq } from '../../api/AxiosDefaults'
import { AuthContext } from '../../contexts/currentUserContext'


function LoginPage() {
  const { login, user } = useContext(AuthContext);
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    console.log(user)
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* const username = usernameRef.current.value;
    const password = passwordRef.current.value; */

    const loginPayLoad = { username: usernameRef.current.value, password: passwordRef.current.value }
    try {
      const { data } = await axiosReq.post('/dj-rest-auth/login/', loginPayLoad)
      console.log("user :", data.user)
      console.log("access :", data.access_token)
      console.log("refresh token :", data.refresh_token)
      // Request to refresh token
    /*  

      const refreshRes = await axiosReq.post('/dj-rest-auth/token/refresh/', refreshPayLoad)
      console.log("new token :", refreshRes.data.access) */

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="username" ref={usernameRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="password" ref={passwordRef} />
      </Form.Group>
      <Button variant="dark" type="submit"> Log in </Button>
    </Form>
  )
}

export default LoginPage