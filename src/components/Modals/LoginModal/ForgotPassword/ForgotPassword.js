import { useState } from 'react';
import classNames from 'classnames/bind';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchCode from '../SearchCode';
import styles from './ForgotPassword.module.scss';
import { HidePasswordIcon, ShowPasswordIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function ForgotPassword({ phone, setPhone, code, setCode, onClick, changeLoginType }) {
    const [codeState, setCodeState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);
    const handleChangeStatePassword = () => {
        setPasswordState(!passwordState);
    };
    return (
        <>
            {!changeLoginType ? (
                <>
                    <div className={cx('description')}>
                        Enter phone number
                        <a href="/login/email/forget-password" className={cx('change-link')} onClick={onClick}>
                            Reset with email
                        </a>
                    </div>
                    <div className={cx('phone-container')}>
                        <div className={cx('code-container')}>
                            <div onClick={() => setCodeState(!codeState)} className={cx('zone-code')}>
                                <span className={cx('vn-code')}>VN +84</span>
                                <button className={cx('search-code-btn', codeState ? 'turn-around' : 'turn-back')}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            </div>
                            {codeState && <SearchCode />}
                        </div>
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            name="mobile"
                            className={cx('phone-number')}
                            placeholder="Phone number"
                        />
                    </div>
                    <div className={cx('send-code')}>
                        <div className={cx('input-container')}>
                            <input
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                                name="code"
                                className={cx('input-code')}
                                placeholder="Enter 6-digit code"
                            />
                        </div>
                        <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('description')}>
                        Enter email address
                        <a href="/login/phone/forget-password" className={cx('change-link')} onClick={onClick}>
                            Reset with phone number
                        </a>
                    </div>
                    <div className={cx('email-container')}>
                        <input name="email" className={cx('email-address')} placeholder="Email or username" />
                    </div>
                    <div className={cx('send-code')}>
                        <div className={cx('input-container')}>
                            <input
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                                name="code"
                                className={cx('input-code')}
                                placeholder="Enter 6-digit code"
                            />
                        </div>
                        <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                    </div>
                </>
            )}
            <div className={cx('password-container')}>
                <input
                    name="password"
                    type={passwordState ? 'text' : 'password'}
                    className={cx('password')}
                    placeholder="Password"
                />
                {passwordState ? (
                    <button onClick={handleChangeStatePassword}>
                        <HidePasswordIcon className={cx('hide-icon')} />
                    </button>
                ) : (
                    <button onClick={handleChangeStatePassword}>
                        <ShowPasswordIcon className={cx('show-icon')} />
                    </button>
                )}
            </div>
        </>
    );
}

export default ForgotPassword;
