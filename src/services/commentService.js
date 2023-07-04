import * as httpRequest from '~/utils/httpRequest';

export const getComments = async (videoId, page, accessToken) => {
    try {
        const res = await httpRequest.get(`videos/${videoId}/comments`, {
            headers: {
                Authorization: `Bearer ${accessToken}}`,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createComment = async (videoId, commentValue, accessToken) => {
    try {
        const res = await httpRequest.post(
            `videos/${videoId}/comments`,
            { comment: commentValue },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (commentId, accessToken) => {
    try {
        const res = await httpRequest.del(`comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
