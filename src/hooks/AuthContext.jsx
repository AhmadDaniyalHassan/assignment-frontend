// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Create the initial state
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Create the reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // You can check the user's authentication status here, e.g., by checking a stored token
        // If the user is authenticated, dispatch({ type: LOGIN, payload: user })
        // If not, dispatch({ type: LOGOUT })
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch({ type: LOGIN, payload: user });
        } else {
            dispatch({ type: LOGOUT });
        }
    }, []);

    const login = (user) => {
        // Save the user to the context and mark as authenticated
        dispatch({ type: LOGIN, payload: user });
        // Save user to local storage for persistence
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        // Remove the user from the context and mark as not authenticated
        dispatch({ type: LOGOUT });
        // Clear user from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
