import { useSettings } from '../../hooks/settings/useSettings';
import { useUpdateSettings } from '../../hooks/settings/useUpdateSettings';

import Form from '../../ui/Form';
import RowForm from '../../ui/RowForm';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice
        } = {} //initial state to prevent component braking
    } = useSettings();

    const { mutate, isPending } = useUpdateSettings();

    function updateHandler(e, field) {
        const { value } = e.target
        if (!value) return

        mutate({[field]: value})
    }

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <RowForm label="Minimum nights/booking">
                <Input
                    type="number"
                    defaultValue={minBookingLength}
                    id="min-nights"
                    onBlur={(e)=> updateHandler(e, "minBookingLength")}
                    disabled={isPending}
                />
            </RowForm>
            <RowForm label="Maximum nights/booking">
                <Input
                    type="number"
                    defaultValue={maxBookingLength}
                    id="max-nights"
                    onBlur={(e)=> updateHandler(e, "maxBookingLength")}
                    disabled={isPending}
                />
            </RowForm>
            <RowForm label="Maximum guests/booking">
                <Input
                    type="number"
                    defaultValue={maxGuestsPerBooking}
                    id="max-guests"
                    onBlur={(e)=> updateHandler(e, "maxGuestsPerBooking")}
                    disabled={isPending}
                />
            </RowForm>
            <RowForm label="Breakfast price">
                <Input
                    type="number"
                    defaultValue={breakfastPrice}
                    id="breakfast-price"
                    onBlur={(e)=> updateHandler(e, "breakfastPrice")}
                    disabled={isPending}
                />
            </RowForm>
        </Form>
    );
}

export default UpdateSettingsForm;
