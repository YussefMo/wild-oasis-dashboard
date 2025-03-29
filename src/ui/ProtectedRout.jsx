import styled from 'styled-components';
import { useUser } from '../hooks/auth/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
    height: 100vh;
    color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProtectedRout({ children }) {
    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    if (isAuthenticated) return children;
}

export default ProtectedRout;
