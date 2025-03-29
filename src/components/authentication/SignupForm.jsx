import Button from '../../ui/Button';
import Form from '../../ui/Form';
import RowForm from '../../ui/RowForm';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../../hooks/auth/usesignUp';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;
    const { signUp, isSignUp } = useSignUp();

    function onSubmit({ fullName, email, password }) {
        signUp(
            { fullName, email, password },
            {
                onSettled: reset
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <RowForm label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register('fullName', {
                        required: 'Full name is required'
                    })}
                    disabled={isSignUp}
                />
            </RowForm>
            <RowForm label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email format'
                        }
                    })}
                    disabled={isSignUp}
                />
            </RowForm>
            <RowForm
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'password is required',
                        minLength: {
                            value: 8,
                            message: 'Password needs a minimum of 8 characters'
                        }
                    })}
                    disabled={isSignUp}
                />
            </RowForm>
            <RowForm
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'password confirm name is required',
                        validate: (value) =>
                            value === getValues().password ||
                            'The passwords do not match'
                    })}
                    disabled={isSignUp}
                />
            </RowForm>
            <RowForm>
                {/* type is an HTML attribute! */}
                <Button
                    $variations="secondary"
                    type="reset"
                    disabled={isSignUp}
                >
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </RowForm>
        </Form>
    );
}

export default SignupForm;
