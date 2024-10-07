// src/VideoList.js
import { Button, Card, CardBody, Image, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { Toaster } from 'react-hot-toast';
import { FaCirclePlay, FaLock } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import LevelOneThumbnail from '../assets/Level-1.png';
import LevelTwoThumbnail from '../assets/Level-2.png';
import fetchVideos from '../services/fetchVideos';
import { useUser } from '../utils/UserProvider';
import { useVideoContext } from '../utils/VideoListProvider';
import VideoPlayer from './VideoPlayer';

const phoneNumber = '+919205104695'; // Replace with the actual phone number
const message = 'Hello! I would like to get L2 access for MBT-Sirius'; // Message you want to pre-fill

const VideoList = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [ videoList, setVideoList ] = useState([]);
    const { dispatch } = useVideoContext();
    const [ selectedVideo, setSelectedVideo ] = useState(null);
    const { state, logout } = useUser();
    const navigate = useNavigate();

    const { data, error, isLoading, isError } = useQuery({
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

    const showVideoPlayer = (video) => {
      setSelectedVideo(video);
    };

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, error]);

  if (selectedVideo) {
    return <VideoPlayer selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
  }

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] p-4 sm:p-6 md:p-8 mx-auto my-12 flex justify-center">
        <Toaster position='top-right' />
        <Spinner size="lg" />
      </div>
    )
  }
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto gap-8 my-4 px-2 xs:px-4'>
      <Toaster position='top-right' />
      { state?.user?.level === 'L2' && videoList?.map((video) => (
        <div key={video.videoId} className={`h-full cursor-pointer ${ isDesktop && 'video-list-item'}`} onClick={() => showVideoPlayer(video)}>
            <Card className='p-4 pb-1 rounded-md h-full'>
              <div className="relative">
                <Image
                src={video.videoLevel === 'L1' ? LevelOneThumbnail : LevelTwoThumbnail}
                objectFit="contain"
                width="100%"
                alt={video.videoTitle	}
                className='aspect-video rounded-md'
              />
              <FaCirclePlay className='hidden hover-play-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10' size={'3rem'} color={'#ff6b6b'} />
              </div>
            <CardBody>
                <h4 className='bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent'>{video.videoTitle	}</h4>
                { video?.videoDescription	&& <p className='text-default-500 text-xs md:text-sm'>{ video?.videoDescription	 }</p> }
            </CardBody>
            </Card>
        </div>
      )) }

      { state?.user?.level === 'L1' && videoList?.map(video => video.videoLevel === 'L1' ? (
        <div key={video.videoId} className={`relative ${ isDesktop && 'video-list-item' }`} onClick={() => showVideoPlayer(video)}>
          <Card className='p-4 pb-1 rounded-md h-full'>
            <div className="relative">
              <Image
                src={video.videoLevel === 'L1' ? LevelOneThumbnail : LevelTwoThumbnail}
                objectFit="contain"
                width="100%"
                alt={video.videoTitle	}
                className='aspect-square rounded-md'
              />
              <FaCirclePlay className='hidden hover-play-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10' size={'3rem'} color={'#ff6b6b'} />
            </div>
            <CardBody>
                <div className="flex flex-col gap-3">
                    <h4 className='bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent'>{video.videoTitle	}</h4>
                    { video?.videoDescription	&& <p className='text-default-500 text-xs md:text-sm'>{ video?.videoDescription	 }</p> }
                    <FaCirclePlay size={'1rem'} className={`${isMobile ? 'block' : 'hidden' }`} color='#ff6b6b' />
                </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div key={video.videoId} className={`${ isDesktop && 'video-list-item' }`}>
          <Card isPressable className='p-4 pb-1 rounded-md h-full' onPress={onOpen}>
            <div className="relative">
              <Image
              src={video.videoLevel === 'L1' ? LevelOneThumbnail : LevelTwoThumbnail}
              objectFit="contain"
              width="100%"
              alt={video.title}
              className='aspect-square rounded-md'
              />
              <FaLock className='hidden hover-lock-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10' size={'3rem'} color={'#ff6b6b'} />
            </div>
            <CardBody>
                <div className="flex flex-col gap-3">
                  <h4 className='bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent'>{video.videoTitle}</h4>
                  { video?.videoDescription	&& <p className='text-default-500 text-xs md:text-sm'>{ video?.videoDescription	 }</p> }
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
              <Button onPress={handleClick} size={`${isMobile ? 'md' : 'lg' }`} className='bg-[#ff6b6b] text-white px-6'>Get L2 Access</Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
      </Modal>
    </div>
  );
};

export default VideoList;
