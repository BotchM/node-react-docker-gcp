import React, { useState, useEffect } from 'react';
import { Navbar, ProgressBar } from 'react-bootstrap';

const Progress = ({name, age}) => {
    return (
        <>
            <ProgressBar variant="info" now={age} label={name} />
        </>
    );
};

export default Progress;