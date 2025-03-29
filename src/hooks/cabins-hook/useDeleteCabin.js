import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins } from '../../services/apiCabins';
import { toast } from 'react-toastify';

export function useDeleteCabin() {
    const queryClint = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: deleteCabins,
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['cabins']
            });
            toast.success('cabin deleted successfully');
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    return { isPending, mutate };
}
