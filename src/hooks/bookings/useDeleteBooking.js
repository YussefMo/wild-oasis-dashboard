import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function useDeleteBooking() {
    const queryClint = useQueryClient();
    const navigate = useNavigate()

    const { isPending, mutate } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['bookings']
            });
            toast.success('booking deleted successfully');
            navigate('/bookings');
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        }
    });

    return { isPending, mutate };
}
