import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut as logOutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogOut() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logOutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login');
        }
    });

    return { logout, isLoggingOut };
}
