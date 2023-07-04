import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './ProfileMenu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { MoreIcon, ShareIcon } from '~/components/Icons';
import ProfileMenuItem from './ProfileMenuItem';
import Footer from './Footer';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function ProfileMenu({ shareItems = [], moreItems = [], onChange = defaultFn, stateOfCurrentUser }) {
    const newItems = shareItems.slice(0, 5);
    const [history, setHistory] = useState([{ data: newItems }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            return <ProfileMenuItem key={index} data={item} />;
        });
    };
    return (
        <>
            {!stateOfCurrentUser && (
                <Tippy
                    interactive
                    delay={[0, 700]}
                    offset={[-80, -5]}
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('more-list')} tabIndex="-1" {...attrs}>
                            <div className={cx('arrow')}></div>
                            <PopperWrapper>
                                <div className={cx('more-body')}>
                                    {moreItems.map((item, index) => (
                                        <div key={index} className={cx('more-items-link')}>
                                            <a href="/">
                                                <div className={cx('more-list', { separate: item.separate })}>
                                                    <span className={cx('more-icon')}>{item.icon}</span>
                                                    <span>{item.title}</span>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                    onHide={() => setHistory([{ data: newItems }])}
                >
                    <div className={cx('user-more')}>
                        <MoreIcon />
                    </div>
                </Tippy>
            )}

            <Tippy
                interactive
                delay={[0, 700]}
                offset={[-110, 0]}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('share-list')} tabIndex="-1" {...attrs}>
                        <div className={cx('arrow')}></div>
                        <PopperWrapper>
                            <div className={cx('share-body')}>{renderItems()}</div>
                            {current.data.length <= 5 && <Footer onWide={() => setHistory([{ data: shareItems }])} />}
                        </PopperWrapper>
                    </div>
                )}
                onHide={() => setHistory([{ data: newItems }])}
            >
                <div className={cx('share')}>
                    <ShareIcon />
                </div>
            </Tippy>
        </>
    );
}

export default ProfileMenu;
