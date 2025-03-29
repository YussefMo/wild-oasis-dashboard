import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLogin } from '../../hooks/auth/useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
    const [email, setEmail] = useState('guest@readonly.com');
    const [password, setPassword] = useState('12345678');
    const { loggingIn, isLoggingIn } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        loggingIn(
            { email, password },
            {
                onSettled: () => {
                    setEmail('');
                    setPassword('');
                }
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    disabled={isLoggingIn}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    disabled={isLoggingIn}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button disabled={isLoggingIn} size="large">
                    {!isLoggingIn ? 'Login' : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
