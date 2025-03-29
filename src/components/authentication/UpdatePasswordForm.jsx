import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import RowForm from '../../ui/RowForm';
import Input from '../../ui/Input';

import { useUpdateUser } from '../../hooks/auth/useUpdateUser';
import { toast } from 'react-toastify';

function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;

    const { updateUser, isUpdating } = useUpdateUser();

    function onSubmit({ password }) {
        toast.error('you cant update password read only account')
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <RowForm
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register('password', {
                        required: 'This field is required',
                        minLength: {
                            value: 8,
                            message: 'Password needs a minimum of 8 characters'
                        }
                    })}
                />
            </RowForm>

            <RowForm
                label="Confirm password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        validate: (value) =>
                            getValues().password === value ||
                            'Passwords need to match'
                    })}
                />
            </RowForm>
            <RowForm>
                <Button onClick={reset} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update password</Button>
            </RowForm>
        </Form>
    );
}

export default UpdatePasswordForm;
