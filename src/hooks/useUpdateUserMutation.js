import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import updatedUser from "../services/updateUser";

const useUpdatedUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatedUser,  // Mutation function
        onSuccess: (data) => {
          const { body } = data;
  
          queryClient.invalidateQueries(['users']);
  
          toast.success('User updated successfully');
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error?.message);
          } else {
            toast.error('Error occurred while updating the user');
          }
        }
      });

}

export default useUpdatedUserMutation