import DashboardFilter from '../components/dashboard/DashboardFilter';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Dashboard() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>
            <DashboardLayout />
        </>
    );
}

export default Dashboard;
