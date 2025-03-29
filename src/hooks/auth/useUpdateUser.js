import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { toast } from 'react-toastify';

export function useUpdateUser() {
    const queryClint = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['user']
            });
            toast.success('user updated successfully');
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    return { updateUser, isUpdating };
}
