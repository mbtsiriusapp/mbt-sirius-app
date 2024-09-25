import Cookies from "js-cookie";
import { BASE_URL } from "./const";

const fetchVideos = async () => {
  const response = await fetch(`${BASE_URL}Prod/video/`, {
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