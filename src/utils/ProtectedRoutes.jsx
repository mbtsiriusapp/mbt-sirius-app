import React from 'react'
import Login from '../pages/Login';
import Layout from './Layout';
import { useUser } from './UserProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { state } = useUser();

    const { isAuthenticated } = state;

    return isAuthenticated ? <Layout /> : <Login />
}

export default ProtectedRoutes