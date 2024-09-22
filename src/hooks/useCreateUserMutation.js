import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import createUser from "../services/createUser";

const useCreateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,  // Mutation function
        onSuccess: (data) => {
          const { body } = data;
  
          queryClient.invalidateQueries(['users']);
  
          toast.success('User created successfully');
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error?.message);
          } else {
            toast.error('Error occurred while creating the user');
          }
        }
      });

}

export default useCreateUserMutation