import { BASE_URL, BASE_URL2 } from "./const";
import Cookies from "js-cookie";

const deleteUser = async (userId) => {
    if (!userId) return;

    const response = await fetch(`https://6mpokdfi86.execute-api.ap-south-1.amazonaws.com/Prod/user/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`,
      },
    });

    console.log('rset', response)
    if (!response.ok) {
      throw new Error('Error deleting user');
    }
  };

export default deleteUser;