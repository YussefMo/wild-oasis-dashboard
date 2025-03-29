import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logIn } from '../../services/apiAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
    const clint = useQueryClient();
    const navigate = useNavigate();

    const { mutate: loggingIn, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => logIn({ email, password }),
        onSuccess: () => {
            toast.success('Logged in successfully');
            clint.invalidateQueries(['user'])
            navigate('/dashboard');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Provided email or password is incorrect');
        }
    });

    return { loggingIn, isLoggingIn, };
}
