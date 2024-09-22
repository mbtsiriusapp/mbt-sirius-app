// src/VideoList.js
import { Button, Card, CardBody, Image, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FaCirclePlay, FaLock } from 'react-icons/fa6';
import LevelOneThumbnail from '../assets/Level1.jpg';
import LevelTwoThumbnail from '../assets/Level2.jpg';
import { useVideoContext } from '../utils/VideoListProvider';
import VideoPlayer from './VideoPlayer';
import Cookies from "js-cookie";
import { useQuery } from '@tanstack/react-query';
import fetchVideos from '../services/fetchVideos';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../utils/UserProvider';

/* 
    User level L2 - all videos play button
    User level L1 - only videos in L1 level play button
    User level L1 - L2 videos lock button
*/

const VideoList = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [ videoList, setVideoList ] = useState([]);
    const { dispatch } = useVideoContext();
    const [ selectedVideo, setSelectedVideo ] = useState(null);
    const { state } = useUser();

    console.log('state ', state?.user?.role)

    const { data, error, isLoading } = useQuery({
      queryKey: ['videos'],
      queryFn: fetchVideos,
      retry: 0, // Retry failed requests up to 2 times
      retryDelay: 1000, // Wait 1 second before retrying,
    });

    useEffect(() => {
      if (data && data.body) {
        setVideoList(data?.body);
      }
    }, [data]);

    useEffect(() => {
      if (error) {
        toast.error('Error while fetching the videos, please try again after some time')
      }
    }, [ error ]);

    const showVideoPlayer = (video) => {
        setSelectedVideo(video);
    };

  if (selectedVideo) {
    return <VideoPlayer selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
  }

  if (isLoading) {
    return (
      <div className="max-w-[1200px] p-4 sm:p-6 md:p-8 mx-auto my-12 flex justify-center">
        <Toaster position='top-right' />
        <Spinner size="lg" />
      </div>
    )
  }
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto gap-8 my-12 px-2 xs:px-4'>
      <Toaster position='top-right' />
      { state?.user?.level === 'L2' && videoList?.map((video) => (
        <div key={video.videoId} className='video-list-item h-full cursor-pointer' onClick={() => showVideoPlayer(video)}>
            <Card className='p-4 pb-1 rounded-md h-full relative'>
                <Image
                    src={video.videoLevel === 'L1' ? LevelOneThumbnail : LevelTwoThumbnail}
                    objectFit="contain"
                    width="100%"
                    alt={video.videoTitle	}
                    className='aspect-square rounded-md'
                />
                <FaCirclePlay className='hidden hover-play-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10' size={'3rem'} color={'#ff6b6b'} />
            <CardBody>
                <h4 className='bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent'>{video.videoTitle	}</h4>
            </CardBody>
            </Card>
        </div>
      )) }

      { state?.user?.level === 'L1' && videoList?.map(video => video.videoLevel === 'L1' ? (
        <div key={video.videoId} className='relative video-list-item' onClick={() => showVideoPlayer(video)}>
          <Card className='p-4 pb-1 rounded-md h-full'>
              <Image
                  src={video.videoLevel === 'L1' ? LevelOneThumbnail : LevelTwoThumbnail}
                  objectFit="contain"
                  width="100%"
                  alt={video.videoTitle	}
                  className='aspect-square rounded-md'
              />
              <FaCirclePlay className='hidden hover-play-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10' size={'3rem'} color={'#ff6b6b'} />
              <CardBody>
                  <div className="flex flex-col gap-3">
                      <h4 className='bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent'>{video.videoTitle	}</h4>
                      <FaCirclePlay size={'1rem'} className={`${isMobile ? 'block' : 'hidden' }`} color='#ff6b6b' />
                  </div>
              </CardBody>
          </Card>
        </div>
      ) : (
        <div key={video.videoId} className='relative video-list-item'>
          <Card isPressable className='p-4 pb-1 rounded-md h-full' onPress={onOpen}>
            <Image
                src={video.videoLevel === 'L1' ? LevelOneThumbnail : LevelTwoThumbnail}
                objectFit="contain"
                width="100%"
                alt={video.title}
                className='aspect-square rounded-md'
            />
            <FaLock className='hidden hover-lock-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10' size={'3rem'} color={'#ff6b6b'} />
            <CardBody>
                <div className="flex flex-col gap-3">
                    <h4 className='bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent'>{video.videoTitle}</h4>
                    <FaLock size={'1rem'} className={`${isMobile ? 'block' : 'hidden' }`} color='#ff6b6b' />
                </div>
            </CardBody>
          </Card>
        </div>
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Upgrade to Level 2 to access all content</ModalHeader>
            <ModalBody className='flex flex-col items-center justify-center gap-6 mb-4'>
              <FaLock size={'4rem'} color='#ff6b6b' />
              <p className='text-center'>
                User access is restricted to watch only the Level 1 video content
              </p>
              <Button size={`${isMobile ? 'md' : 'lg' }`} className='bg-[#ff6b6b] text-white px-6'>Get L2 Access</Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
      </Modal>
    </div>
  );
};

export default VideoList;
