import { useCheckOut } from '../../hooks/check-in-out/useCheckOut';
import Button from '../../ui/Button';

function CheckoutButton({ bookingId }) {
    const { checkOut, isCheckOut } = useCheckOut();

    return (
        <Button
            $variations="secondary"
            sizes="small"
            onClick={() => checkOut(bookingId)}
            disabled={isCheckOut}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
