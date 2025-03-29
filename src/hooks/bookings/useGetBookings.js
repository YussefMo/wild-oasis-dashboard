import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/globalConst';

export function useGetBookings() {
    const queryClint = useQueryClient();
    const [searchParam] = useSearchParams();

    //  filter
    const filterValue = searchParam.get('status');
    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue };

    // sortBt
    const sortByValue = searchParam.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByValue.split('-');
    const sortBy = { field, direction };

    // pagination
    const page = Number(searchParam.get('page')) || 1;
    
    // fetching data
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page })
    });
    
    const pageCount = Math.ceil(count / PAGE_SIZE);
    // per fetching data
    if (pageCount > page) {
        queryClint.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        });
    }

    if (page > 1) {
        queryClint.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        });
    }

    return { isLoading, bookings, error, count };
}
