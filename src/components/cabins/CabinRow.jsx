import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useCreateCabin } from '../../hooks/cabins-hook/useCreateCabin';
import { useDeleteCabin } from '../../hooks/cabins-hook/useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.2rem;
`;

function CabinRow({ cabin }) {
    const { isPending, mutate } = useDeleteCabin();
    const { mutate: duplicateCabin, isCreating: isDuplicating } =
        useCreateCabin();

    const {
        id,
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image
    } = cabin;

    function duplicateHandler() {
        duplicateCabin(
            {
                name: `Copy of ${name}`,
                maxCapacity,
                regularPrice,
                discount,
                description,
                image
            },
            null,
            true
        ); // Set isDuplicate = true
    }

    return (
        <>
            <Table.Row>
                <Img
                    src={image}
                    alt={description}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${import.meta.env.BASE_URL}not-found.jpg`;
                    }}
                />
                <Cabin>{name}</Cabin>
                <div>fits up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}
                <ButtonContainer>
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={id} />
                            <Menus.List id={id}>
                                <Menus.Button
                                    disabled={isDuplicating}
                                    onClick={duplicateHandler}
                                    icon={<HiSquare2Stack />}
                                >
                                    Duplicate
                                </Menus.Button>
                                <Modal.Open opens="edit-cabin-form">
                                    <Menus.Button icon={<HiPencil />}>
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>
                                <Modal.Open opens="delete-cabin-confirm">
                                    <Menus.Button icon={<HiTrash />}>
                                        Delete
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>
                            <Modal.Window name="edit-cabin-form">
                                <CreateCabinForm cabinToEdit={cabin} />
                            </Modal.Window>
                            <Modal.Window name="delete-cabin-confirm">
                                <ConfirmDelete
                                    resourceName={`${name}?`}
                                    disabled={isPending}
                                    onConfirm={() => mutate(id)}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>
                </ButtonContainer>
            </Table.Row>
        </>
    );
}

export default CabinRow;
