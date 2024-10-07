// src/Header.js
import { Button, Image, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Tell Webpack this JS file uses this image
import { useTheme } from '../utils/ThemeProvider';
import { useUser } from '../utils/UserProvider';

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const Header = () => {
  const { logout, state } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={headerVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }} className={`flex z-50 sticky justify-between items-center p-4 ${theme === 'dark' ? 'bg-black' : 'bg-white' }`}>
      {/* Logo Section */}
      <Link to='/'>
        <div className="flex items-center space-x-4">
          <Image
            src={logo} // Replace with your logo path
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-semibold text-[#ff6b6b] hidden sm:block">MBT-SIRIUS</span>
        </div>
      </Link>

      {/* User Section */}
      <div className="flex items-center justify-center space-x-6">
        {
          theme === 'light'? (
            <MdDarkMode className='text-xl cursor-pointer' onClick={toggleTheme} />
          ) : (
            <MdLightMode className='text-xl cursor-pointer' onClick={toggleTheme} />
          )
        }
        <span className="text-sm font-medium hidden sm:flex items-center gap-3">
            <FaRegUser size={'1rem'} />
            <span>{ state?.user?.name }</span>
        </span>
        <span className="text-sm font-medium hidden sm:inline-block">{ state?.user?.level }</span>
        <Popover placement="bottom" offset={20}>
          <PopoverTrigger>
            <Button isIconOnly variant='light' className='flex sm:hidden' onPress={() => logout()}>
              <FaRegUser size={'1rem'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-6 py-2 flex flex-col gap-2">
              <div className="text-small font-bold">Name - { state?.user?.name }</div>
              <div className="text-xs text-gray-500">Level - { state?.user?.level }</div>
            </div>
          </PopoverContent>
        </Popover>
        <Button color="danger" className='hidden sm:flex' startContent={<MdLogout />} onPress={() => logout()}>
            Logout
        </Button>  
        <Button isIconOnly className='flex sm:hidden' color={'danger'} onPress={() => logout()}>
          <MdLogout />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
