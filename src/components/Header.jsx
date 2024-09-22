// src/Header.js
import { Button, Image, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react';
import React from 'react';
import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import logo from '../assets/logo.jpg'; // Tell Webpack this JS file uses this image
import { Link } from 'react-router-dom';
import { useUser } from '../utils/UserProvider';
import { useTheme } from '../utils/ThemeProvider';
import { motion } from 'framer-motion';

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const Header = () => {
  const { logout, state } = useUser();
  const { theme, toggleTheme } = useTheme();

  console.log('state ', state);
 
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={headerVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }} className={`flex z-50 sticky top-0 left-0 right-0 justify-between items-center p-4 ${theme === 'dark' ? 'bg-black' : 'bg-white' }`}>
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
        <Popover placement="bottom" offset={20}>
          <PopoverTrigger>
            <Button isIconOnly variant='light' className='flex sm:hidden' onPress={() => logout()}>
              <FaRegUser size={'1rem'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-6 py-2">
              <div className="text-small font-bold">{ state?.user?.name }</div>
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
