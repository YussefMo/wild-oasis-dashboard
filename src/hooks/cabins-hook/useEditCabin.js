import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-toastify';

export function useEditCabin() {
    const queryClint = useQueryClient();

    const { mutate: updateCabin, isPending: isUpdating } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['cabins']
            });
            toast.success('cabin updated successfully');
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    return { updateCabin, isUpdating };
}
