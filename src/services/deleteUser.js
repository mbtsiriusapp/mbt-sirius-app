import Cookies from "js-cookie";
import { BASE_URL } from "./const";

const deleteUser = async (userId) => {
    if (!userId) return;

    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting user');
    }
  };

export default deleteUser;
