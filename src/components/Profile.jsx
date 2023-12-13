// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
    const navigate = useNavigate()
    const { state, logout } = useAuth();
    const [getUser, setGetUser] = useState([])
    useEffect(() => {
        const fetchVoucherData = async () => {
            try {
                if (state.user?.id) {

                    const response = await axios.post('https://80c8-111-88-181-82.ngrok-free.app/api/user/getuser', {
                        id: state.user.id
                    });
                    setGetUser(response?.data?.user);
                }
            } catch (error) {
                console.error('Error fetching voucher data:', error);
            }
        };

        fetchVoucherData();
    }, [state.user?.id, state.isAuthenticated]);

    const handleLogout = () => {
        // Clear local storage and perform logout

        localStorage.removeItem('usersId');
        localStorage.removeItem('editVoucherId')
        logout(); // Assuming your useAuth hook provides a logout function

        // Redirect to the login page
        navigate('/login')
    };
    return (
        <div>
            {localStorage.setItem('usersId', JSON.stringify(getUser.id))}
            {state.isAuthenticated ? (
                <>
                    <h1>Welcome to your profile, {state.user.name} 🚀!</h1>
                    <h1>Your Id is , {state.user.id} 🚀!</h1>
                    <button className='bg-blue-500 text-white p-2 rounded-md"' onClick={handleLogout}>Logout</button>

                </>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default ProfilePage;
