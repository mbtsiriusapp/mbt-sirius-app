// components/NotFound.js

import { Button } from '@nextui-org/react';
import { useUser } from '../utils/UserProvider';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import React from 'react';
import { MdHome } from 'react-icons/md';

const NotFound = () => {
  const { state, setUser } = useUser();
  const navigate = useNavigate();

  const handleGoToHomeBtnClick = () => {

    if (state?.isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Page not found.</p>
      <Button
        variant='flat'
        className='bg-white rounded-md flex items-center justify-center'
        size="lg"
        onClick={handleGoToHomeBtnClick}
      >
        <FaHome color='black' size={'1rem'} />
        <span className='text-black'>Go to Home</span>
      </Button>
    </div>
  );
};

export default NotFound;
