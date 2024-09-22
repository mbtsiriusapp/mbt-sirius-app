// VideoContext.js

import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  videoList: []
};

// Action types
const SET_VIDEOS = 'SET_VIDEOS';

// Reducer function
const videoReducer = (state, action) => {
  switch (action.type) {
    case SET_VIDEOS:
      return { ...state, videoList: [ ...action.payload ] };
    default:
      return state;
  }
};

// Create context
const VideoContext = createContext();

// Context provider component
const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

// Custom hook to use the VideoContext
const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};

export { VideoProvider, useVideoContext, SET_VIDEOS };
