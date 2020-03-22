import React, { useState, useEffect } from 'react';
import { Navbar, ProgressBar, Button, Form, Row, Col, Container, Table} from 'react-bootstrap';

const Progress = ({users}) => (
    <div>
        {users.map(user => (
            <ProgressBar now={user.age} label={`${user.name}`} />
        ))}
    </div>
);

const UsersTable = ({users}) => (
    <div>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Active</th>
                </tr>
            </thead>
            {users.map(user => (
                <>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.active.toString()}</td>
                    </tr>
                </tbody>
                </>
            ))}
        </Table>
    </div>
);

const Home = () => {
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);

    
    const getUsers = async () => {
        const response = await fetch('/v1/api/users', {
            method: 'GET', 
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
        });

        setUsers(await response.json());
    }

    // const fetchAsync = async email => await (await fetch(`/v1/api/users/?email=${email}`)).json()

    const updateUser = async event => {
        const form = event.target;
        const userId = form.elements.userId.value;

        const data = {
            name: form.elements.formGroupName.value,
            email: form.elements.formGroupEmail.value,
            age: form.elements.formGroupAge.value,
            active: true
        }

        console.log(userId)

        const response = await fetch(`/v1/api/users/${userId}`, {
            method: 'PUT', 
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        setUsers([...users, await response.json()]);

    }
    const createuser = async event => {
        const form = event.target;
        
        const data = {
            name: form.elements.formGroupName.value,
            email: form.elements.formGroupEmail.value,
            age: form.elements.formGroupAge.value,
            active: false
        }

        const response = await fetch(`/v1/api/users`, {
            method: 'POST', 
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        setUsers([...users, await response.json()]);
    }

    const deleteUser = async event => {
        const userId = event.target.elements.userId.value;

        const response = await fetch(`/v1/api/users/${userId}`, {
            method: 'DELETE', 
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        setUsers(
            users.filter((_, index) => index !== userId)
        );
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>CMPT A3</Navbar.Brand>
        </Navbar>

        <Container>
            <hr/>
            <Form onSubmit={deleteUser}>
                <Row>
                    <Col>
                        <Form.Group controlId="userId">
                            <Form.Control required type="text" placeholder="Enter User Id" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button 
                            type="submit"
                            variant="info"
                        >Delete User</Button>{' '}
                    </Col>
                </Row>
            </Form>
            <hr/>
            <Form onSubmit={createuser}>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="formGroupAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Age" />
                </Form.Group>
                <Button 
                    type="submit"
                    variant="info"
                >Create</Button>{' '}
            </Form>
            <hr />
            <Form onSubmit={updateUser}>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="formGroupAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Age" />
                </Form.Group>
                <Form.Group controlId="userId">
                    <Form.Label>Id (Id of the user you want to update)</Form.Label>
                    <Form.Control required type="text" placeholder="Enter User Id" />
                    </Form.Group>
                <Button 
                    type="submit"
                    variant="info"
                >Update User</Button>{' '}
            </Form>
            <hr/>
                <Button 
                    variant="info"
                    onClick={getUsers}
                >Get All Users</Button>{' '}
            <hr/>

            <UsersTable users={users}/>
            <Progress users={users}/>
            <hr/>
        </Container>
        </>
    );
};

export default Home;