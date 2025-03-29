import supabase from './supabase';

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(
        import.meta.env.VITE_SUPABASE_URL
    );

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        ''
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/edit cabin
    let query = supabase.from('cabins');

    // A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    if (hasImagePath) return data;

    // 2. Upload image

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageError);
        throw new Error(
            'Cabin image could not be uploaded and the cabin was not created'
        );
    }

    return data;
}

export async function deleteCabins(id) {
    // Step 1: Get the cabin to extract the image path
    const { data: cabin, error: fetchError } = await supabase
        .from('cabins')
        .select('image')
        .eq('id', id)
        .single();

    if (fetchError) {
        console.error(fetchError);
        throw new Error('Failed to fetch cabin data for deletion');
    }

    const imageUrl = cabin?.image;
    const imageName = imageUrl?.split('/').pop(); // Extract filename

    // Step 2: Delete the cabin from the database
    const { data, error: deleteError } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (deleteError) {
        console.error(deleteError);
        throw new Error('Cabin could not be deleted');
    }

    // Step 3: Check if any other cabins are using the same image
    if (imageName) {
        const { data: otherCabins, error: checkError } = await supabase
            .from('cabins')
            .select('id')
            .neq('id', id) // Exclude the deleted cabin
            .eq('image', imageUrl); // Check if the image is still in use

        if (checkError) {
            console.error(checkError);
            throw new Error('Error checking for other cabins using the image');
        }

        // Step 4: Only delete the image if no other cabins are using it
        if (!otherCabins.length) {
            const { error: storageError } = await supabase.storage
                .from('cabin-images')
                .remove([imageName]);

            if (storageError) {
                console.error(storageError);
                throw new Error(
                    'Cabin image could not be deleted from storage'
                );
            }
        }
    }

    return data;
}
