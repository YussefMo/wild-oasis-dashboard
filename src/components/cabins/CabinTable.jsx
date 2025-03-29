import { useGetCabins } from '../../hooks/cabins-hook/useGetCabins';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
    const { isLoading, cabins } = useGetCabins();

    const [searchParam] = useSearchParams();

    if (isLoading) return <Spinner />;
    // for filter
    const filterValue = searchParam.get('discount') || 'all';

    let filteredCabins;
    if (filterValue === 'all') {
        filteredCabins = cabins;
    } else if (filterValue === 'with-discount') {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    } else {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    }

    // for sort
    const sortBy = searchParam.get('sortBy') || 'name-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;

    const sortedValue = filteredCabins.sort((a, b) =>
        typeof a[field] === 'string'
            ? a[field].localeCompare(b[field]) * modifier
            : (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div>Image</div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div>Actions</div>
                </Table.Header>
                <Table.Body
                    data={sortedValue}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
