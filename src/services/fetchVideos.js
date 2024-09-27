import Cookies from "js-cookie";
import { BASE_URL } from "./const";
import toast from "react-hot-toast";

const fetchVideos = async () => {
  const response = await fetch(`${BASE_URL}Prod/video/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('auth-token')}`,
    },
  });

  if (!response.ok) {
    if (String(response?.status) === '403') {
      toast.error('Session timed out');
      throw new Error('Not Authorized');
    } else {
      toast.error('Error occurred while fetching the videos!! Please try again');
    }
  }
  
  return response.json();
};

export default fetchVideos;