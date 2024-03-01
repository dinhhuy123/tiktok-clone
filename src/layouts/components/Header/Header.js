import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faSignOut, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import {
    MessageIcon,
    InboxIcon,
    ViewProfileIcon,
    GetCoinsIcon,
    LiveStudioIcon,
    SettingIcon,
    LanguageIcon,
    FeedbackIcon,
    KeyboardIcon,
    DarkModeIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from './Search';
import Notifications from './Notifications';
import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

const currentUser = JSON.parse(localStorage.getItem('user'));

const user = currentUser ? currentUser.data.nickname : '';

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
    {
        icon: <DarkModeIcon />,
        title: 'Dark mode',
    },
];

const USERS_MENU = [
    {
        icon: <ViewProfileIcon />,
        title: 'View profile',
        to: `/users/@${user}`,
    },
    {
        icon: <GetCoinsIcon />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <LiveStudioIcon />,
        title: 'LIVE Studio',
        to: '/live',
    },
    {
        icon: <SettingIcon />,
        title: 'Setting',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        type: 'logout',
        separate: true,
    },
];

function Header({ onClick, className }) {
    const [userProfile, setUserProfile] = useState({});
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const [notification, setNotification] = useState(false);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            case 'logout':
                authService.logout(accessToken).then(() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
        if (accessToken) {
            authService.getCurrentUser(accessToken).then((res) => {
                setUserProfile(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', className)}>
                <div className={cx('logoContainer')}>
                    <Link to={config.routes.home} className={cx('logoLink')}>
                        <img src={images.logo} alt="Tiktok" />
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button to="/upload" upload leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <HeadlessTippy
                                visible
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <div className={cx('notifications')}>
                                            <Notifications />
                                        </div>
                                    </div>
                                )}
                            >
                                <Tippy delay={[0, 200]} content="Message" placement="bottom">
                                    <button className={cx('action-btn')} onClick={() => setNotification(!notification)}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </HeadlessTippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                            <Menu items={USERS_MENU} onChange={handleMenuChange}>
                                <Image className={cx('user-avatar')} src={userProfile.avatar} alt="Nguyen Van A" />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button upload onClick={onClick} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button primary onClick={onClick}>
                                Log in
                            </Button>
                            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                    {/* <Menu items={currentUser ? USERS_MENU : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu> */}
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    onclick: PropTypes.func,
    className: PropTypes.string,
};

export default Header;
