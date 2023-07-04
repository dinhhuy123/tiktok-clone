import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import Button from '~/components/Button';
import { ToTopIcon } from '~/components/Icons';
import { ModalContextShow } from '~/contexts/ModalContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [height, setHeight] = useState(0);

    const { showLoginModal } = useContext(ModalContextShow);

    useEffect(() => {
        window.onscroll = () => {
            setHeight(document.documentElement.scrollTop);
        };
        if (height > 0) {
            document.getElementById('toTop').style.bottom = '12px';
        } else {
            document.getElementById('toTop').style.bottom = '-32px';
        }
    });

    return (
        <div className={cx('wrapper')}>
            <Header onClick={showLoginModal} />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar onClick={showLoginModal} />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('getApp')} id="toTop">
                <Button rounded className={cx('getAppBtn')}>
                    Get app
                </Button>
                <Button href="#" className={cx('toTop')}>
                    <ToTopIcon />
                </Button>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
