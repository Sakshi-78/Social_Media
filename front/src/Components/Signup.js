import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', {
                email: email,
                password: password
            });
            setMessage(response.data.msg);
            // Handle the message response from the server, such as displaying a success message
        } catch (error) {
            console.error('Signup error:', error);
            // Handle the error, such as displaying an error message to the user
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
