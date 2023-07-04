import * as httpRequest from '~/utils/httpRequest';

export const createNewVideo = async (dataUpload, accessToken) => {
    try {
        const res = await httpRequest.post('videos', dataUpload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
