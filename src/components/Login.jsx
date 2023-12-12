import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const { login, state } = useAuth();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple form validation
        if (!loginData.email || !loginData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // Perform your login API request using Axios
            const response = await axios.post('http://localhost:3001/api/user/login', loginData);
            if (response.data.success) {
                console.log(response.data);
                login(response.data.user);
                localStorage.setItem('token', response.data.token);
                navigate('/profile')

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <div className="text-2xl font-bold">
            <h1>Login Page</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
