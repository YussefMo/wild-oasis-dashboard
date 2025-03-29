import styled from 'styled-components';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBookingById } from '../../hooks/bookings/useGetBookingById';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';

import BookingDataBox from '../../components/bookings/BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useCheckIn } from '../../hooks/check-in-out/useCheckIn';
import { useSettings } from '../../hooks/settings/useSettings';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakFast, setAddBreakFast] = useState(false);

    const { isLoading, booking } = useGetBookingById();
    const { isLoading: isGetSettings, settings } = useSettings();
    const moveBack = useMoveBack();
    const { mutate: checkIn, isPending } = useCheckIn();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking?.isPaid]);

    if (isLoading || isGetSettings) return <Spinner />;

    const { id, guests, totalPrice, numGuests, hasBreakfast, numNights } =
        booking;
    const optionalBreakFastPrice =
        settings.breakfastPrice * numNights * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;
        if (addBreakFast) {
            checkIn({
                bookingId: id,
                breakFast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakFastPrice,
                    totalPrice: totalPrice + optionalBreakFastPrice
                }
            });
        } else {
            checkIn({ bookingId: id, breakFast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>
            <BookingDataBox booking={booking} />
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakFast}
                        onChange={() => {
                            setAddBreakFast((add) => !add);
                            setConfirmPaid((confirm) => !confirm);
                        }}
                        id="add-breakfast"
                    >
                        Add breakfast for {numGuests} guests for {numNights}{' '}
                        nights for {formatCurrency(optionalBreakFastPrice)}
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    disabled={confirmPaid || isPending}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm-paid"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{' '}
                    {!addBreakFast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + optionalBreakFastPrice)} 
                        (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakFastPrice)})`}
                </Checkbox>
            </Box>
            <ButtonGroup>
                <Button
                    disabled={!confirmPaid || isPending}
                    onClick={handleCheckin}
                >
                    Check in booking #{id}
                </Button>
                <Button
                    disabled={isPending}
                    $variations="secondary"
                    onClick={moveBack}
                >
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
