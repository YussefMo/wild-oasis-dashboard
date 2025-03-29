import styled from 'styled-components';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBookingById } from '../../hooks/bookings/useGetBookingById';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckOut } from '../../hooks/check-in-out/useCheckOut';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from '../../hooks/bookings/useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useGetBookingById();
    const navigate = useNavigate();
    const moveBack = useMoveBack();

    const { checkOut, isCheckOut } = useCheckOut();
    const { isPending, mutate } = useDeleteBooking();

    if (isLoading) return <Spinner />;
    if (booking === undefined) return <Empty resource="booking" />
    const { status, id } = booking;

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver'
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>
            <BookingDataBox booking={booking} />
            <ButtonGroup>
                {status === 'unconfirmed' && (
                    <Button onClick={() => navigate(`/check-in/${id}`)}>
                        Check In
                    </Button>
                )}
                {status === 'checked-in' && (
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkOut(id)}
                        disabled={isCheckOut}
                    >
                        Check Out
                    </Button>
                )}
                <Modal>
                    <Modal.Open opens="delete-booking-details">
                        <Button $variations="danger">Delete Booking</Button>
                    </Modal.Open>
                    <Modal.Window name="delete-booking-details">
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isPending}
                            onConfirm={() => mutate(id)}
                        />
                    </Modal.Window>
                </Modal>
                <Button $variations="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
