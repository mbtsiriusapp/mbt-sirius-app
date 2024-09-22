// VideoPlayer.js
import React from 'react';
import { FaChevronLeft, FaCircleChevronLeft } from 'react-icons/fa6';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ selectedVideo, setSelectedVideo}) => {
  const handleBackBtn = () => setSelectedVideo(null);

  return (
    <div className="max-w-[800px] gap-8 relative my-12 mx-auto px-2">
        
        <div className="chevron-left cursor-pointer" onClick={handleBackBtn}>
          <FaCircleChevronLeft size={'1.5rem'} className='block sm:hidden' color='#ff6b6b' />
              
          <div className="gap-2 hidden sm:flex -translate-y-[25%] bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] text-black py-2 px-4 rounded-md justify-center max-w-32 items-center">
              <FaChevronLeft color='black' />
              <span className=''>Back</span>
          </div>
        </div>
        <h4 className='text-medium md:text-xl lg:text-2xl bg-gradient-to-bl from-[#ff6b6b] to-[#f06595] bg-clip-text text-transparent text-center mb-4'>{ selectedVideo?.videoTitle }</h4>
        <div className="video-player w-full">
            <ReactPlayer
            url={selectedVideo?.videoLink }
            playing={false}
            controls={true}
            volume={0.8}
            muted={false}
            width={'100%'}
            height={'auto'}
            type={'video/mp4'}
            />
        </div>
    </div>
  );
};

export default VideoPlayer;
