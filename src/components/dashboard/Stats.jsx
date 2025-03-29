import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
    // num of bookings
    const totalBookings = bookings.length;
    // total sales
    const totalSales = bookings.reduce(
        (total, stay) => total + stay.totalPrice,
        0
    );
    // total confirmed stays
    const totalConfirmedStays = confirmedStays.length;

    // total occupancy rate num checked in nights / all available nights
    const totalOccupancyRate =
        (confirmedStays.reduce((total, stay) => total + stay.numNights, 0) /
            (numDays * cabinsCount)) *
        100;

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={totalBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(totalSales)}
            />
            <Stat
                title="Check Ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={totalConfirmedStays}
            />
            <Stat
                title="Occupancy Rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(totalOccupancyRate)+'%'}
            />
        </>
    );
}

export default Stats;
