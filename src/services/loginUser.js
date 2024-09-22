import toast from "react-hot-toast";
import { BASE_URL } from "./const";

const loginUser = async (userCredentials) => {
  console.log('userCredentials', JSON.stringify(userCredentials))
    const response = await fetch(`https://7s56nrsp0d.execute-api.ap-south-1.amazonaws.com/Prod/login-manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });
    console.log('response', response)
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