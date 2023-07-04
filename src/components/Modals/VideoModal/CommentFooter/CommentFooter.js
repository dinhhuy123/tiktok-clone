import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentFooter.module.scss';

import * as commentService from '~/services/commentService';
import Emoji from '../Emoji/Emoji';

const cx = classNames.bind(styles);

function CommentFooter({ setComments, videoId, showNotify }) {
    const [commentValue, setCommentValue] = useState('');
    const [showCount, setShowCount] = useState(false);

    const inputRef = useRef();

    const defaultInputHeight = useRef();

    const maxTextLength = 150;

    useEffect(() => {
        defaultInputHeight.current = inputRef.current.offsetHeight;
    }, []);

    const handleChangeTextArea = (e) => {
        const value = e.target.value;
        value.startsWith(' ') || (value.length <= maxTextLength && setCommentValue(value));
    };

    const handleCreateComment = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

        const data = await commentService.createComment(videoId, commentValue, accessToken);
        if (data) {
            setComments((prev) => {
                const newComments = [data, ...prev];
                return newComments;
            });
            setCommentValue('');
            showNotify('Comment posted!');
        }
    };

    useEffect(() => {
        const element = inputRef.current;
        element.style.height = 'auto';
        const scrollHeight = element.scrollHeight;
        element.style.height = scrollHeight + 'px';

        const isShow = scrollHeight > defaultInputHeight.current;
        isShow !== showCount && setShowCount(isShow);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentValue]);

    return (
        <div className={cx('commentFooter')}>
            <div className={cx('footerContainer')}>
                <div className={cx('textContainer')}>
                    <div className={cx('text')}>
                        <div className={cx('textCenter')}>
                            <textarea
                                rows="1"
                                ref={inputRef}
                                value={commentValue}
                                onChange={handleChangeTextArea}
                                className={cx('textStyle')}
                                placeholder="Add comment"
                                spellCheck={false}
                                onKeyUp={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                    e.stopPropagation();
                                    if (e.keyCode === 13) {
                                        e.preventDefault();
                                        // Submit
                                        handleCreateComment();
                                    }
                                }}
                            ></textarea>
                            {showCount && (
                                <p className={cx('count')}>
                                    {commentValue.length}/{maxTextLength}
                                </p>
                            )}
                        </div>
                        <Emoji
                            setCommentValue={setCommentValue}
                            commentValue={commentValue}
                            maxTextLength={maxTextLength}
                        />
                    </div>
                </div>
                <button className={cx('postBtn', `${!commentValue ? 'disabled' : ''}`)} onClick={handleCreateComment}>
                    Post
                </button>
            </div>
        </div>
    );
}

export default CommentFooter;
