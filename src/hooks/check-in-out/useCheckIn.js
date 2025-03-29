import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function useCheckIn() {
    const queryClint = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: ({bookingId, breakFast}) =>
            updateBooking(bookingId, {
                status: 'checked-in',
                isPaid: true,
                ...breakFast
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClint.invalidateQueries({ active: true });
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { mutate, isPending };
}
