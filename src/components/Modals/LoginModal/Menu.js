import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LoginModal.module.scss';
import ModalItem from './ModalItem';
import { LoginNormal, LoginQRCode } from './Login';
import { SignupNormal } from './Signup';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ items = [], signup = [], onChange = defaultFn, changeType }) {
    const [history, setHistory] = useState([{ data: items }]);
    useEffect(() => {
        changeType ? setHistory([{ data: signup.slice(0, 3) }]) : setHistory([{ data: items }]);
    }, [changeType, items, signup]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <ModalItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const changeLoginType = () => {
        switch (current.type) {
            case 'QR':
                return <LoginQRCode title={current.title} />;
            case 'LOGIN':
                return <LoginNormal title={current.title} />;
            case 'SIGNUP':
                return <SignupNormal title={current.title} />;
            default:
                throw new Error('error!');
        }
    };
    return (
        <div className={cx('inner')}>
            {history.length > 1 && (
                <>
                    <header className={cx('header')}>
                        <button
                            className={cx('backBtn')}
                            onClick={() => {
                                setHistory((prev) => prev.slice(0, prev.length - 1));
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </header>
                    {changeLoginType()}
                </>
            )}
            {!changeType
                ? history.length <= 1 && <h2 className={cx('title')}>Log in to TikTok</h2>
                : history.length <= 1 && <h2 className={cx('title')}>Sign up for TikTok</h2>}
            {renderItems()}
            {history.length <= 1 && changeType && current.data.length <= 3 && (
                <div className={cx('more')}>
                    <button className={cx('moreBtn')} onClick={() => setHistory([{ data: signup }])}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            )}
        </div>
    );
}

Menu.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
};

export default Menu;
