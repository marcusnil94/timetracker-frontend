import React, { useState, useEffect } from 'react';

const Login: React.FC<{ setIsLoggedIn: (isLoggedIn: boolean) => void; setPage: (page: string) => void; }> = ({ setIsLoggedIn, setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Check if userId is present in localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true); // If userId is present, user is logged in
        }
    }, []); // Run only once on component mount

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const userId = await response.text(); // Extract userId from response body
                localStorage.setItem('userId', userId);
                console.log('User logged in successfully');
                setIsLoggedIn(true); // Update login status
                setPage('start');
                
            } else {
                console.error('Failed to log in');
                setErrorMessage('Failed to log in');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Failed to log in');
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Log In</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};

export default Login;