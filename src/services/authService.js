import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        return await httpRequest.post('auth/login', {
            email,
            password,
        });
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (accessToken) => {
    try {
        return await httpRequest.post('auth/logout', [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const register = async (dataRegister) => {
    try {
        return await httpRequest.post('auth/register', dataRegister);
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async (accessToken) => {
    try {
        const res = await httpRequest.get('auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateCurrentUser = async (dataCurrentUser, accessToken) => {
    try {
        const res = await httpRequest.post('auth/me?_method=PATCH', dataCurrentUser, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
