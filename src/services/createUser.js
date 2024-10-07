import Cookies from "js-cookie";
import { BASE_URL } from "./const";

const createUser = async (newUser) => {
    if (!newUser) return;

    const response = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`,
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      if (Number(response?.status) === 409)
        throw new Error('User already exists');
      else 
        throw new Error('Error in creating the user');
    }
    return response.json();
  };

export default createUser;
