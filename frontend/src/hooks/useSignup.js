import React from 'react'
import { signup } from '../lib/api.js';
import { useMutation, useQueryClient } from "@tanstack/react-query";


const signUp = () => {
    const queryClient = useQueryClient();

    const {mutate: signupMutation, isPending, error} = useMutation({
      mutationFn: signup,
      onSuccess:() => queryClient.invalidateQueries({queryKey: ["authUser"] }),
    });

    return {error, isPending, signupMutation};
}

export default signUp