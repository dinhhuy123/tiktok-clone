import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Scrollbars as CustomScrollbar } from 'react-custom-scrollbars-2';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import Discover from '~/components/Discover';
import Privacy from '~/components/Privacy';
import Button from '~/components/Button';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar({ onClick }) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
    const INIT_PAGE = 1;
    const PER_PAGE = currentUser ? 8 : 5;

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [perPage, setPerPage] = useState(PER_PAGE);
    const [hideScrollbar, setHideScrollbar] = useState(true);

    const customScrollbar = (className) => {
        return (props) => <div className={cx(className)} {...props}></div>;
    };

    useEffect(() => {
        userService
            .getSuggestedUsers({ page: INIT_PAGE, perPage: perPage, accessToken })
            .then((data) => {
                console.log(data);
                setSuggestedUsers(data);
            })
            .catch((error) => console.log(error));
    }, [accessToken, perPage]);

    useEffect(() => {
        userService
            .getFollowingUsers({ page: 1, accessToken })
            .then((data) => {
                console.log(data);
                setFollowingUsers(data);
            })
            .catch((error) => console.log(error));
    }, [accessToken]);

    const moreSugUsers = () => {
        if (suggestedUsers.length === PER_PAGE) {
            setPerPage(PER_PAGE * 2);
        } else {
            setPerPage(PER_PAGE);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('innerFixed')}>
                <CustomScrollbar
                    hideTracksWhenNotNeeded
                    autoHide={hideScrollbar}
                    autoHideTimeout={0}
                    renderView={customScrollbar('scrollbarView')}
                    renderTrackVertical={customScrollbar('scrollbarTrack')}
                    renderThumbVertical={customScrollbar('scrollbarThumb')}
                    onMouseEnter={() => setHideScrollbar(false)}
                    onMouseLeave={() => setHideScrollbar(true)}
                >
                    <div className={cx('content')}>
                        {currentUser ? (
                            <>
                                <Menu>
                                    <MenuItem
                                        title="For you"
                                        to={config.routes.home}
                                        icon={<HomeIcon />}
                                        activeIcon={<HomeActiveIcon />}
                                    />
                                    <MenuItem
                                        title="Following"
                                        to={config.routes.following}
                                        icon={<UserGroupIcon />}
                                        activeIcon={<UserGroupActiveIcon />}
                                    />
                                    <MenuItem
                                        title="LIVE"
                                        to={config.routes.live}
                                        icon={<LiveIcon />}
                                        activeIcon={<LiveActiveIcon />}
                                    />
                                </Menu>
                                <SuggestedAccounts
                                    moreTitle={suggestedUsers.length === PER_PAGE ? 'See all' : 'See less'}
                                    label="Suggest accounts"
                                    data={suggestedUsers.filter((suggestedUser) => suggestedUser.is_followed === false)}
                                    moreSugUserFunc={moreSugUsers}
                                />
                                {followingUsers[0] && (
                                    <SuggestedAccounts
                                        moreTitle="See more"
                                        label="Following accounts"
                                        data={followingUsers}
                                    />
                                )}
                                <Discover label="Discover" />
                                <Privacy />
                            </>
                        ) : (
                            <>
                                <Menu>
                                    <MenuItem
                                        title="For you"
                                        to={config.routes.home}
                                        icon={<HomeIcon />}
                                        activeIcon={<HomeActiveIcon />}
                                    />
                                    <MenuItem
                                        title="Following"
                                        to={config.routes.following}
                                        icon={<UserGroupIcon />}
                                        activeIcon={<UserGroupActiveIcon />}
                                    />
                                    <MenuItem
                                        title="LIVE"
                                        to={config.routes.live}
                                        icon={<LiveIcon />}
                                        activeIcon={<LiveActiveIcon />}
                                    />
                                </Menu>
                                <div className={cx('loginSidebar')}>
                                    <span className={cx('title')}>
                                        Log in to follow creators, like videos, and view comments.
                                    </span>
                                    <Button onClick={onClick} outline large className={cx('login-btn')}>
                                        Login
                                    </Button>
                                </div>
                                <SuggestedAccounts label="Suggest accounts" data={suggestedUsers} />
                                <Discover label="Discover" />
                                <Privacy />
                            </>
                        )}
                    </div>
                </CustomScrollbar>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    className: PropTypes.string,
    state: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Sidebar;
