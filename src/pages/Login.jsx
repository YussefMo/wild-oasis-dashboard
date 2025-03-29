import styled from 'styled-components';
import LoginForm from '../components/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);
`;

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Login() {
    return (
        <LoginLayout>
            <ImageContainer>
                <Logo />
            </ImageContainer>
            <Heading as="h4">Log In To Your Account</Heading>
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
