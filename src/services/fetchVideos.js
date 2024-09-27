import Cookies from "js-cookie";
import { BASE_URL } from "./const";
import toast from "react-hot-toast";

const fetchVideos = () => {
  return fetch(`${BASE_URL}Prod/video/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('auth-token')}`,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    return data;
  });

  // if (!response.ok) {
  //   if (String(response?.status) === '403') {
  //     toast.error('Session timed out');
  //     throw new Error('Not Authorized');
  //   } else {
  //     toast.error('Error occurred while fetching the videos!! Please try again');
  //   }
  // }
  
  // return response.json();
};
export default fetchVideos;