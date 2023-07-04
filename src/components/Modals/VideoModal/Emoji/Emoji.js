import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Emoji.module.scss';
import { EmotionIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const dataEmoji = [
    {
        tabIcon: '😊',
        tabValue: [
            '😀',
            '😃',
            '😃',
            '😁',
            '😆',
            '😅',
            '🤣',
            '😂',
            '🙂',
            '🙃',
            '😉',
            '😊',
            '😇',
            '😍',
            '😘',
            '😗',
            '😚',
            '😙',
            '😋',
            '😛',
            '😜',
            '😝',
            '🤑',
            '🤗',
            '🤔',
            '🤐',
            '😐',
            '😑',
            '😶',
            '😏',
            '😒',
            '🙄',
            '😬',
            '🤥',
            '😌',
            '😔',
            '😪',
            '🤤',
            '😴',
            '😷',
            '🤒',
            '🤕',
            '🤢',
            '🤧',
            '😵',
            '🤠',
            '😎',
            '🤓',
            '😕',
            '😟',
            '🙁',
            '😮',
            '😯',
            '😲',
            '😳',
            '😦',
            '😧',
            '😨',
            '😰',
            '😥',
            '😢',
            '😭',
            '😱',
            '😖',
            '😣',
            '😞',
            '😓',
            '😩',
            '😫',
            '😤',
            '😡',
            '😠',
            '😈',
            '👿',
        ],
    },
    {
        tabIcon: '😹',
        tabValue: [
            '😺',
            '😸',
            '😹',
            '😻',
            '😼',
            '😽',
            '🙀',
            '😿',
            '😾',
            '💀',
            '💩',
            '🤡',
            '👹',
            '👺',
            '👻',
            '👽',
            '👾',
            '🤖',
        ],
    },
];

function Emoji({ setCommentValue, commentValue, maxTextLength }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [showEmojiBlock, setShowEmojiBlock] = useState(false);

    const handleAddEmoji = (item) => {
        setCommentValue((prev) => {
            if (prev.length >= maxTextLength - 1) {
                return prev;
            }
            const newComments = (commentValue += item);
            return newComments;
        });
        setShowEmojiBlock(false);
    };

    const tippyHeadlessRender = (attrs) => (
        <div className={cx('emojiRender')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('noPadding', 'block')}>
                <ul className={cx('emojiTab')}>
                    {dataEmoji.map((tab, index) => (
                        <li
                            key={index}
                            className={cx('tab', `${index === tabIndex ? 'active' : ''}`)}
                            onClick={() => setTabIndex(index)}
                        >
                            {tab.tabIcon}
                        </li>
                    ))}
                </ul>
                <div className={cx('emojiBlock')}>
                    <ul className={cx('emojiList')}>
                        {dataEmoji[tabIndex].tabValue.map((item, index) => (
                            <li key={index} className={cx('item')} onClick={() => handleAddEmoji(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <HeadlessTippy
            interactive
            placement="top-start"
            render={tippyHeadlessRender}
            visible={showEmojiBlock}
            onClickOutside={() => {
                setShowEmojiBlock(false);
            }}
        >
            <Tippy content="Click to add emojis" placement="top" zIndex={999999}>
                <div className={cx('emotionIcon')} onClick={() => setShowEmojiBlock(true)}>
                    <EmotionIcon />
                </div>
            </Tippy>
        </HeadlessTippy>
    );
}

export default Emoji;
