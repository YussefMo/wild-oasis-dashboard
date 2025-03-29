import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-toastify';

export function useCheckOut() {
    const queryClint = useQueryClient();

    const { mutate: checkOut, isPending: isCheckOut } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: 'checked-out',
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClint.invalidateQueries({ active: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { checkOut, isCheckOut };
}
