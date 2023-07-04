import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './CommentBody.module.scss';
import * as commentService from '~/services/commentService';
import Image from '~/components/Image/Image';
import { MoreIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import { ModalContextShow } from '~/contexts/ModalContext';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function CommentBody({ isAuth, handleTime, commentState, videoId, showNotify }) {
    const [page, setPage] = useState(1);
    const [comments, setComments] = commentState;
    const [accessToken, setAccessToken] = useState('');

    const { showConfirmModal } = useContext(ModalContextShow);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
        setAccessToken(accessToken);

        const fetchApi = async () => {
            const data = await commentService.getComments(videoId, page, accessToken);
            if (data) {
                setComments(data);
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, page]);

    const deleteCmt = async (index, commentId) => {
        const data = await commentService.deleteComment(commentId, accessToken);
        if (!data.message) {
            setComments((prev) => {
                const newComments = [...prev];
                newComments.splice(index, 1);
                return newComments;
            });
            showNotify('Deleted!');
        }
    };

    const confirmDeleteComment = (index, commentId) => {
        const dataModal = {
            description: (
                <div className={cx('deleteTitle')}>
                    <div>Are you sure you want to delete this comment?</div>
                </div>
            ),
            agree: (
                <div className={cx('general', 'delete')} onClick={() => deleteCmt(index, commentId)}>
                    Delete
                </div>
            ),
            cancel: <div className={cx('general', 'cancel')}>Cancel</div>,
        };
        showConfirmModal(dataModal);
    };

    return (
        <div className={cx('commentBody')}>
            <div className={cx('bodyContainer')}>
                {/* <div className={cx('content')}>Be the first to comment!</div> */}
                {comments.map((comment, index) => (
                    <div key={index} className={cx('userInfo')}>
                        <HeadlessTippy
                            interactive
                            delay={[200, 200]}
                            offset={[-10, 2]}
                            render={() => (
                                <div tabIndex="-1">
                                    <PopperWrapper>
                                        <AccountPreview data={comment.user} />
                                    </PopperWrapper>
                                </div>
                            )}
                            placement="bottom-start"
                        >
                            <Image className={cx('avatar')} src={comment.user.avatar}></Image>
                        </HeadlessTippy>
                        <div className={cx('commentContainer')}>
                            <a href="/" className={cx('userLink')}>
                                <span className={cx('name')}>
                                    {/* {comment.user.first_name + ' ' + comment.user.last_name} */}
                                    {comment.user.nickname}
                                </span>
                                {isAuth(comment.user.nickname) && <span className={cx('creator')}>Creator</span>}
                            </a>
                            <p className={cx('comment')}>
                                <span>{comment.comment}</span>
                            </p>
                            <p className={cx('time')}>
                                <span>{handleTime(comment.created_at)}</span>
                                <span>Reply</span>
                            </p>
                        </div>
                        <div className={cx('likeComment')}>
                            <HeadlessTippy
                                interactive
                                delay={[0, 200]}
                                offset={[-80, 10]}
                                placement="bottom"
                                render={(attrs) => (
                                    <div className={cx('deleteContainer')} tabIndex="-1" {...attrs}>
                                        <div className={cx('arrow')}></div>
                                        <PopperWrapper
                                            className={cx(
                                                'noPadding',
                                                `${!isAuth(comment.user.nickname) ? '' : 'minHeight'}`,
                                            )}
                                        >
                                            <ul className={cx('itemList')}>
                                                {!isAuth(comment.user.nickname) && (
                                                    <li
                                                        className={cx(
                                                            'title',
                                                            `${!isAuth(comment.user.nickname) ? 'border' : ''}`,
                                                        )}
                                                    >
                                                        Report
                                                    </li>
                                                )}
                                                <li
                                                    className={cx('title')}
                                                    onClick={() => confirmDeleteComment(index, comment.id)}
                                                >
                                                    Delete
                                                </li>
                                            </ul>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('moreBtn')}>
                                    <MoreIcon />
                                </div>
                            </HeadlessTippy>
                            <div className={cx('likeReaction')}>
                                <div className={cx('heartIcon')}>
                                    <FontAwesomeIcon className={cx('heart')} icon={faHeart} />
                                </div>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentBody;
