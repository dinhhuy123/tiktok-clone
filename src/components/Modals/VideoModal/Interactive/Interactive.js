import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';
import {
    EmailIcon,
    EmbedIcon,
    FacebookIcon,
    LineIcon,
    LinkedInIcon,
    PinterestIcon,
    RedditIcon,
    ShareToFriendsIcon,
    ShareVideoIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '~/components/Icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './Interactive.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const shareItems = [
    {
        icon: <LinkedInIcon />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon />,
        title: 'Share to Reddit',
    },
    {
        icon: <TelegramIcon />,
        title: 'Share to Telegram',
    },
    {
        icon: <EmailIcon />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon />,
        title: 'Share to Line',
    },
    {
        icon: <PinterestIcon />,
        title: 'Share to Pinterest',
    },
];

function Interactive({ videoInfo }) {
    return (
        <div className={cx('interactive')}>
            <div className={cx('userAction')}>
                <button className={cx('actionContainer')}>
                    <span className={cx('actionBtn')}>
                        <FontAwesomeIcon className={cx('actionIcon')} icon={faHeart} />
                    </span>
                    <span className={cx('count')}>{videoInfo.likes_count}</span>
                </button>
                <button className={cx('actionContainer')}>
                    <span className={cx('actionBtn')}>
                        <FontAwesomeIcon className={cx('actionIcon')} icon={faCommentDots} />
                    </span>
                    <span className={cx('count')}>{videoInfo.comments_count}</span>
                </button>
            </div>
            <div className={cx('userInteractive')}>
                <Tippy content="Embed" zIndex={1000001} offset={[0, 8]}>
                    <a className={cx('iconLink')} href="/#">
                        <EmbedIcon className={cx('interIcon')} />
                    </a>
                </Tippy>
                <Tippy content="Send to friends" zIndex={1000001} offset={[0, 8]}>
                    <a className={cx('iconLink')} href="/#">
                        <ShareToFriendsIcon className={cx('interIcon')} />
                    </a>
                </Tippy>
                <Tippy content="Share to Facebook" zIndex={1000001} offset={[0, 8]}>
                    <a className={cx('iconLink')} href="/#">
                        <FacebookIcon className={cx('interIcon')} />
                    </a>
                </Tippy>
                <Tippy content="Share to WhatsApp" zIndex={1000001} offset={[0, 8]}>
                    <a className={cx('iconLink')} href="/#">
                        <WhatsAppIcon className={cx('interIcon')} />
                    </a>
                </Tippy>
                <Tippy content="Share to Twitter" zIndex={1000001} offset={[0, 8]}>
                    <a className={cx('iconLink')} href="/#">
                        <TwitterIcon className={cx('interIcon')} />
                    </a>
                </Tippy>
                <HeadlessTippy
                    interactive
                    // visible
                    arrow={true}
                    offset={[0, 10]}
                    delay={[0, 500]}
                    // offset={[-80, -5]}
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('shareList')} tabIndex="-1" {...attrs}>
                            <div className={cx('arrow')}></div>
                            <PopperWrapper className={cx('shareListContainer')}>
                                <div className={cx('listBody')}>
                                    {shareItems.map((item, index) => (
                                        <a href="/" key={index} className={cx('itemLink')}>
                                            <span className={cx('icon')}>{item.icon}</span>
                                            <span className={cx('title')}>{item.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <button className={cx('sharedBtn')}>
                        <ShareVideoIcon />
                    </button>
                </HeadlessTippy>
            </div>
        </div>
    );
}

export default Interactive;
