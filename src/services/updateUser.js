import Cookies from "js-cookie";
import { BASE_URL2 } from "./const";

const updatedUser = async (userToUpdate) => {
    const userToUpdateWithoutId = {};

    if (!userToUpdate || !userToUpdate?.userId) return;

    const userId = userToUpdate.userId;

    for (const key in userToUpdate) {
      if (userToUpdate.hasOwnProperty(key) && key !== 'userId') { // Check if the property is not inherited
          userToUpdateWithoutId[key] = userToUpdate[key]; // Copy the property to the clone object
      }
    }

    const response = await fetch(`https://6mpokdfi86.execute-api.ap-south-1.amazonaws.com/Prod/user/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`,
      },
      body: JSON.stringify(userToUpdateWithoutId),
    });
    if (!response.ok) {
      if (Number(response?.status) === 409)
        throw new Error('User already exists');
      else 
        throw new Error('Error in updating the user');
    }
    return response.json();
  };

export default updatedUser;