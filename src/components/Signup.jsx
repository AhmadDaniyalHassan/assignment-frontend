// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData);

            // Replace 'YOUR_API_URL' with your actual API endpoint for signup
            const apiUrl = 'https://061f-39-34-176-183.ngrok-free.app/api/user/signup';
            const response = await axios.post(apiUrl, formData);
            console.log('Signup successful:', response.data);
            navigate('/login')
            // Handle success, e.g., redirect to the dashboard
        } catch (error) {
            console.error('Signup failed:', error.message);
            // Handle error, e.g., display an error message to the user
        }
    };

    return (
        <div className="text-2xl font-bold">
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
