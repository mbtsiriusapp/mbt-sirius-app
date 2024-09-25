import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AdminsTable from '../components/AdminsTable';
import UsersTable from '../components/UsersTable';
import fetchUsersList from '../services/fetchUsersList';
import { useUser } from '../utils/UserProvider';
const AdminDashboard = () => {
  // logged in user state
  const { state } = useUser();

  // Fetching all users based on user role
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['users', state?.user?.role ],
    queryFn: fetchUsersList,
    retry: 0, // Retry failed requests up to 2 times
    retryDelay: 1000, // Wait 1 second before retrying,
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

  return (
    <div className='max-w-[1200px] mx-auto my-4 p-2 sm:p-4 flex flex-col gap-8'>
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