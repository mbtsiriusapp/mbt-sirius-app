import React, { useEffect, useState } from 'react';
import AdminsTable from '../components/AdminsTable';
import UsersTable from '../components/UsersTable';
import { useUser } from '../utils/UserProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import fetchUsersList from '../services/fetchUsersList';
import { BASE_URL, BASE_URL2 } from '../services/const';
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  // logged in user state
  const { state } = useUser();

  // Fetching all users based on user role
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['users', state?.user?.role ],
    queryFn: fetchUsersList
  })

  const [ users, setUsers ] = useState([]);
  const [ admins, setAdmins ] = useState([]);

  useEffect(() => {
    if (data && data.body) {
      const { body } = data;
      if (body && Array.isArray(body)) {
        const onlyUsers = body?.filter(current => current?.role === 'user');
        setUsers(onlyUsers);
        const onlyAdmins = body?.filter(current => current?.role ==='admin');
        setAdmins(onlyAdmins);
      }
      // toast.success('User data fetched successfully');
    } 
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error('Error fetching user data! Please try again after some time')
    }
  }, [ isError ]);

  return (
    <div className='max-w-[1200px] mx-auto my-12 p-2 sm:p-4 flex flex-col gap-8'>
      <Toaster position='top-right' />
      
      <UsersTable users={users} />

      {
        state?.user?.role === 'super-admin' && (
          <AdminsTable admins={admins} />
        )
      }

    </div>
  )
}

export default AdminDashboard;