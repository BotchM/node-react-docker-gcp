import React, { useState, useEffect } from 'react';
import { Navbar, ProgressBar } from 'react-bootstrap';
import Progress  from '../progress/index' 

const Home = () => {
    const [userId, setUserId] = useState('');
    
    useEffect(() => {
        const url = `/v1/api/users/${userId || ''}`;

        const getUsers = async () => {
            const response = await fetch(url, {
                method: 'GET', 
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/json'
                },
                // body: JSON.stringify(data)
            });

            console.log(await response.json())
        }

        getUsers();
    });

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>CMPT A3</Navbar.Brand>
            </Navbar>

            <Progress />
        </>
    );
};

export default Home;