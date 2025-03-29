import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import RowForm from '../../ui/RowForm';
import Input from '../../ui/Input';
import { useUser } from '../../hooks/auth/useUser';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';

function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName }
        }
    } = useUser();

    const { updateUser, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    // eslint-disable-next-line no-unused-vars
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (!fullName) {
            return;
        }
        updateUser(
            { fullName, avatar },
            {
                onSettled: () => {
                    // Reset the form after the update is successful
                    setFullName(currentFullName);
                    setAvatar(null);
                    e.target.reset();
                }
            }
        );
    }

    function handelReset() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <RowForm label="Email address">
                <Input value={email} disabled />
            </RowForm>
            <RowForm label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                />
            </RowForm>
            <RowForm label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    disabled={isUpdating}
                />
            </RowForm>
            <RowForm>
                <Button
                    type="reset"
                    variation="secondary"
                    onClick={handelReset}
                >
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </RowForm>
        </Form>
    );
}

export default UpdateUserDataForm;
