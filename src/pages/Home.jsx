import React from 'react'
import VideoList from '../components/VideoList'
import { useUser } from '../utils/UserProvider';
import AdminDashboard from '../components/AdminDashboard';

const Home = () => {
  const { state } = useUser();

  if ((state?.user?.role === 'admin' || state?.user?.role === 'super-admin') && state?.isAuthenticated) {
    return (
      <AdminDashboard />
    )
  }

  return (
    <VideoList />
  )
}

export default Home