import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import LoginType from './LoginType';
import ForgotPassword from '../ForgotPassword';

const cx = classNames.bind(styles);

function Login({ title }) {
    const [changeLoginType, setChangeLoginType] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleChangeLoginType = (e) => {
        e.preventDefault();
        setChangeLoginType(!changeLoginType);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setForgotPassword(!forgotPassword);
    };

    return (
        <div className={cx('form-input')}>
            {!forgotPassword ? (
                <>
                    <h4 className={cx('header-title')}>{title}</h4>
                    <LoginType
                        onClick={handleChangeLoginType}
                        changeLoginType={changeLoginType}
                        onForgot={handleForgotPassword}
                    />
                </>
            ) : (
                <>
                    <h4 className={cx('header-title')}>Reset password</h4>
                    <ForgotPassword onClick={handleChangeLoginType} changeLoginType={changeLoginType} />
                </>
            )}
        </div>
    );
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Login;
