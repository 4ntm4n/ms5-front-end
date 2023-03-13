import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { axiosRes } from '../../api/AxiosDefaults'
import axios from 'axios'


function LoginPage() {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        /* const username = usernameRef.current.value;
        const password = passwordRef.current.value; */

        const loginPayLoad = {username: usernameRef.current.value, password: passwordRef.current.value}
        try {
        const { data } = await axiosRes.post('/dj-rest-auth/login/', loginPayLoad)
        console.log(data)
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