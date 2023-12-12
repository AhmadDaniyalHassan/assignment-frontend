// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const Sidebar = () => {
    const { state } = useAuth();

    return (
        <div className="bg-gray-800 text-white  min-h-screen w-64  p-4">
            <div className="text-2xl font-bold mb-4">SideBar Navigation</div>
            <ul>
                <li className="mb-2">
                    <Link to="/" className="hover:text-gray-300">Dashboard</Link>
                </li>
                {!state.isAuthenticated ? (
                    <>
                        <li className="mb-2">
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                        </li>

                        <li className="mb-2">
                            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                        </li>
                    </>
                ) : (
                    ""
                )}
                {state.isAuthenticated ? (
                    <li className="mb-2">
                        <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                    </li>
                ) : (
                    ""
                )}

            </ul>
        </div>
    );
};

export default Sidebar;
