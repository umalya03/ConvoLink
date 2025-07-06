import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectFriendRequest } from '../lib/api.js';
import toast from 'react-hot-toast';

const useRejectFriendRequest = () => {
    const queryClient = useQueryClient();

    const { mutate: rejectRequestMutation, isPending, error } = useMutation({
        mutationFn: rejectFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
            toast.success("Friend request rejected");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to reject friend request");
        }
    });

    return { rejectRequestMutation, isPending, error };
};

export default useRejectFriendRequest;