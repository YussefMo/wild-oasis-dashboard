import supabase from './supabase';

export async function signUp({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: '',
                role: 'dashboard_user'
            }
        }
    });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function logIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }
    return data?.user;
}

export async function logOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    let updateDataObj;
    if (password) {
        updateDataObj = { password };
    }
    if (fullName) {
        updateDataObj = {
            data: { fullName }
        };
    }

    // 1 update name or password
    const { data, error } = await supabase.auth.updateUser(updateDataObj);

    if (error) {
        throw new Error(error.message);
    }
    if (!avatar) return data;

    // 2 extract the user sub data
    const sub = data.user.user_metadata.sub;

    // 3 upload avatar
    const fileName = `avatar-${sub}-${Math.random()}`;

    const { error: avatarError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatar);

    if (avatarError) {
        throw new Error('Avatar could not be uploaded');
    }

    // 4 update the avatar to the user
    const { data: updatedUser, error: updateUserError } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`
            }
        });
    if (updateUserError) {
        throw new Error('User could not be updated with avatar');
    }

    return updatedUser;
}
