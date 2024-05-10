import React, { useState, useEffect } from 'react';

const Login: React.FC<{ setIsLoggedIn: (isLoggedIn: boolean) => void; setPage: (page: string) => void; }> = ({ setIsLoggedIn, setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true); 
        }
    }, []); 

    const handleLogin = async () => {
        try {
            const response = await fetch('https://seal-app-du7qr.ondigitalocean.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const userId = await response.text(); 
                localStorage.setItem('userId', userId);
                console.log('User logged in successfully');
                setIsLoggedIn(true); 
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