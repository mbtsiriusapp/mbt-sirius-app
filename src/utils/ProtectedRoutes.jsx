import React from 'react'
import Login from '../pages/Login';
import Layout from './Layout';
import { useUser } from './UserProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { state } = useUser();
    const navigate = useNavigate();

    const { isAuthenticated } = state;

    if (!isAuthenticated) {
        navigate('/login');
        return;
    }

    return <Layout />
}

export default ProtectedRoutes