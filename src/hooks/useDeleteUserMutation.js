import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import deleteUser from "../services/deleteUser";

const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,  // Mutation function
        onSuccess: () => {
          queryClient.invalidateQueries(['users']);
  
          toast.success('User deleted successfully');
        },
        onError: (error) => {
            toast.error('Error occurred while deleting the user');
        }
      });

}

export default useDeleteUserMutation