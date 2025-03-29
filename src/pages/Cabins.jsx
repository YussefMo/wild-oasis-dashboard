import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../components/cabins/CabinTable';
import AddCabin from '../components/cabins/AddCabin';
import CabinTableOperations from '../components/cabins/CabinTableOperations';

function Cabins() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>
            <Row>
                <CabinTable />
                <AddCabin />
            </Row>
        </>
    );
}

export default Cabins;
