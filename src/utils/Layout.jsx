import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Divider } from '@nextui-org/divider';
import { VideoProvider } from './VideoListProvider';

const Layout = () => {
  return (
    <VideoProvider>
      <div className='App'>
        <Header />
        <Divider />
        <Outlet />
      </div>
    </VideoProvider>
  )
}

export default Layout