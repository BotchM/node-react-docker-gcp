import React, { useState, useEffect } from 'react';
import { Navbar, ProgressBar } from 'react-bootstrap';

const Progress = () => {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    
    useEffect(() => {

    });

    return (
        <>
            <ProgressBar variant="info" now={age} label={name} />
        </>
    );
};

export default Progress;