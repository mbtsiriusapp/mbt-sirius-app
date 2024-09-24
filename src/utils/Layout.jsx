import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Divider } from '@nextui-org/divider';
import { VideoProvider } from './VideoListProvider';
import { isMobile } from 'react-device-detect';

const Layout = () => {
  return (
    <VideoProvider>
      <div className='App' style={{ '--appHeight': isMobile ? '100dvh': '100vh' }} >
        <Header />
        <Divider />
        <Outlet />
      </div>
    </VideoProvider>
  )
}

export default Layout