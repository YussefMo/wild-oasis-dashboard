import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useGetTodayActivity() {
    const { data: todayStays, isLoading } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity']
    });

    return { isLoading, todayStays };
}
