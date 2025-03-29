import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import { toast } from 'react-toastify';

export function useSignUp() {
    const { mutate: signUp, isPending: isSignUp } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (data) => {
            console.log(data);
            toast.success(
                'account created successfully'
            );
        }
    });

    return { signUp, isSignUp };
}
