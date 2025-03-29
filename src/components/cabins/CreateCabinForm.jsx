import { useForm } from 'react-hook-form';
import { useEditCabin } from '../../hooks/cabins-hook/useEditCabin';
import { useCreateCabin } from '../../hooks/cabins-hook/useCreateCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import RowForm from '../../ui/RowForm';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {}
    });

    const { errors } = formState;

    const { mutate, isCreating } = useCreateCabin();

    const { updateCabin, isUpdating } = useEditCabin();

    const isLoading = isUpdating || isCreating;

    function submitHandler(data) {
        if (isEditSession) {
            updateCabin(
                {
                    newCabinData: {
                        ...data,
                        image:
                            data.image[0] instanceof File
                                ? data.image[0]
                                : data.image
                    },
                    id: editId
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            );
        } else {
            mutate(
                { ...data, image: data.image[0] },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            );
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(submitHandler)}
            type={onCloseModal ? 'modal' : ''}
        >
            <RowForm error={errors?.name?.message} label="Cabin Name">
                <Input
                    type="text"
                    id="name"
                    disabled={isLoading}
                    {...register('name', {
                        required: 'Cabin name is required'
                    })}
                />
            </RowForm>
            <RowForm error={errors?.maxCapacity?.message} label="Max Capacity">
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isLoading}
                    {...register('maxCapacity', {
                        required: 'Cabin max capacity is required',
                        min: {
                            value: 1,
                            message: 'Cabin max capacity must be at least 1'
                        }
                    })}
                />
            </RowForm>
            <RowForm
                error={errors?.regularPrice?.message}
                label="Regular Price"
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isLoading}
                    {...register('regularPrice', {
                        required: 'Cabin price is required',
                        min: {
                            value: 1,
                            message: 'Cabin price must be at least 1'
                        }
                    })}
                />
            </RowForm>
            <RowForm error={errors?.discount?.message} label="Discount">
                <Input
                    type="number"
                    id="discount"
                    disabled={isLoading}
                    defaultValue={0}
                    {...register('discount', {
                        required: 'Cabin discount is required',
                        validate: (value) =>
                            value <= getValues().regularPrice / 2 ||
                            `Cabin discount shouldn't be greater than the half of the price`
                    })}
                />
            </RowForm>
            <RowForm error={errors?.description?.message} label="Description">
                <Textarea
                    type="number"
                    id="description"
                    disabled={isLoading}
                    defaultValue=""
                    {...register('description', {
                        required: 'Cabin description is required'
                    })}
                />
            </RowForm>
            <RowForm error={errors?.image?.message} label="image">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isLoading}
                    {...register('image', {
                        validate: (files) => {
                            if (isEditSession) return true;
                            if (!files || files.length === 0) {
                                return 'Cabin image is required';
                            }
                            if (files[0].size > 6 * 1024 * 1024) {
                                return 'Image size must be less than 6MB';
                            }
                            return true;
                        }
                    })}
                />
            </RowForm>
            <RowForm>
                <Button
                    $variations="secondary"
                    type="reset"
                    disabled={isLoading}
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>
                    {isEditSession ? 'Update Cabin' : 'Add Cabin'}
                </Button>
            </RowForm>
        </Form>
    );
}

export default CreateCabinForm;
