import styled from 'styled-components';
import { useRecentBookings } from '../../hooks/dashboard/useRecentBookings';
import { useRecentStays } from '../../hooks/dashboard/useRecentStays';
import { useGetCabins } from '../../hooks/cabins-hook/useGetCabins';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import Today from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { isLoading, bookings, numDays } = useRecentBookings();
    const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
    const { cabins, isLoading: isLoadingCabins } = useGetCabins();

    if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinsCount={cabins?.length}
            />
            <Today />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart booking={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
