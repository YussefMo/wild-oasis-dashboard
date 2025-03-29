import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiEye,
    HiTrash
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckOut } from '../../hooks/check-in-out/useCheckOut';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from '../../hooks/bookings/useDeleteBooking';

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        startDate,
        endDate,
        numNights,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName }
    }
}) {
    const navigate = useNavigate();
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver'
    };

    const { checkOut, isCheckOut } = useCheckOut();
    const { isPending, mutate } = useDeleteBooking()

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>
            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>
            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? 'Today'
                        : formatDistanceFromNow(startDate)}{' '}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
                    {format(new Date(endDate), 'MMM dd yyyy')}
                </span>
            </Stacked>
            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            Booking Details
                        </Menus.Button>
                        {status === 'unconfirmed' && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() =>
                                    navigate(`/check-in/${bookingId}`)
                                }
                            >
                                Check In
                            </Menus.Button>
                        )}
                        {status === 'checked-in' && (
                            <Menus.Button
                                icon={<HiArrowUpOnSquare />}
                                onClick={() => checkOut(bookingId)}
                                disabled={isCheckOut}
                            >
                                Check Out
                            </Menus.Button>
                        )}
                        <Modal.Open opens="delete-booking">
                            <Menus.Button icon={<HiTrash />} onClick={() => {}}>
                                Delete
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                    <Modal.Window name="delete-booking">
                        <ConfirmDelete
                            resourceName='booking'
                            disabled={isPending}
                            onConfirm={() => mutate(bookingId)}
                        />
                    </Modal.Window>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
