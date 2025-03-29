import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-toastify';

export function useCreateCabin() {
    const queryClint = useQueryClient();

    const { mutate, isPending: isCreating } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['cabins']
            });
            toast.success('cabin created successfully');
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    return { mutate, isCreating };
}
