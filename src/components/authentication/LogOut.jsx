import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogOut } from '../../hooks/auth/useLogOut';
import SpinnerMini from '../../ui/SpinnerMini';

function LogOut() {
    const { logout, isLoggingOut } = useLogOut();

    return (
        <ButtonIcon onClick={logout} disabled={isLoggingOut}>
            {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    );
}

export default LogOut;
