import toast from "react-hot-toast";
import { BASE_URL } from "./const";

const loginUser = async (userCredentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });
    if (!response.ok) {
      if (String(response?.status) === '401') {
        toast.error('Email or password incorrect');
      } else {
        toast.error('Error occurred while logging in');
      }
      throw new Error('Error occurred while logging in');
    }
    return response.json();
  };

export default loginUser;
