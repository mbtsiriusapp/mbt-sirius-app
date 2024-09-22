import { BASE_URL, BASE_URL2 } from "./const";
import Cookies from "js-cookie";

const fetchVideos = async () => {
  const response = await fetch(`https://6mpokdfi86.execute-api.ap-south-1.amazonaws.com/Prod/video/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('auth-token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

export default fetchVideos;