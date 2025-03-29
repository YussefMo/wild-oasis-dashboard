import { toast } from 'react-toastify';
import { updateSetting } from '../../services/apiSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateSettings() {
    const queryClint = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (newSetting) => updateSetting(newSetting),
        onSuccess: () => {
            toast.success('Setting updated successfully');
            queryClint.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    return { mutate, isPending };
}
