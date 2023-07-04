import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Password.module.scss';
import { HidePasswordIcon, ShowPasswordIcon, ValidateIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Password({ password, setPassword, validPwd }) {
    const [passwordState, setPasswordState] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const classPwdLength = useMemo(() => {
        return password.length >= 8 && password.length <= 20 ? 'valid-pwd-length' : '';
    }, [password]);

    const classPwdCharacter = useMemo(() => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/.test(password) ? 'valid-pwd-character' : '';
    }, [password]);

    const handleChangeStatePassword = () => {
        setPasswordState(!passwordState);
    };

    const handleFocusPwd = () => {
        setPwdFocus(true);
        setValidPassword(false);
    };

    const handleValidatePwd = () => {
        if (!password) {
            setPwdFocus(false);
            setValidPassword(false);
        } else {
            if (!validPwd) {
                setValidPassword(true);
            } else {
                setValidPassword(false);
            }
        }
    };

    return (
        <div className={cx('password-container')}>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                name="password"
                type={passwordState ? 'text' : 'password'}
                aria-describedby="pwdnote"
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-autocomplete="list"
                className={cx('password', `${validPassword ? 'validate-input-pwd' : ''}`)}
                placeholder="Password"
                onFocus={handleFocusPwd}
                onBlur={handleValidatePwd}
                required
            />
            {validPassword && (
                <span className={cx('validate-icon')}>
                    <ValidateIcon />
                </span>
            )}
            <div id="pwdnote" className={cx(`${pwdFocus && !validPwd ? 'instructions' : 'offscreen'}`)}>
                <p>Your password must have:</p>
                <span className={cx(`${validPassword ? 'validate-pwd' : ''}`, classPwdLength)}>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}></FontAwesomeIcon>8 to 20 characters
                </span>
                <span className={cx(`${validPassword ? 'validate-pwd' : ''}`, classPwdCharacter)}>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}></FontAwesomeIcon>
                    Letter, number, and special characters
                </span>
            </div>
            {passwordState ? (
                <button onClick={handleChangeStatePassword} className={cx('hide-icon')}>
                    <HidePasswordIcon />
                </button>
            ) : (
                <button onClick={handleChangeStatePassword} className={cx('show-icon')}>
                    <ShowPasswordIcon />
                </button>
            )}
        </div>
    );
}

export default Password;
