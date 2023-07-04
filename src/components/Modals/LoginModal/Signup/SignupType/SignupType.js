import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SignupType.module.scss';
import SearchCode from '../../SearchCode';
import Password from './Password/Password';
import ConfirmPassword from './ConfirmPassword/ConfirmPassword';
import * as authService from '~/services/authService';
import { NotifyContextShow } from '~/contexts/NotifyContext';

const cx = classNames.bind(styles);

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

function SignupType({ month, day, year, setSuccess }) {
    const userRef = useRef();
    // const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [changeSignupType, setChangeSignupType] = useState(false);

    const [validPwd, setValidPwd] = useState(false);

    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const showNotify = useContext(NotifyContextShow);

    const handleChangeSignupType = (e) => {
        e.preventDefault();
        setChangeSignupType(!changeSignupType);
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
        const match = password === confirmPwd;
        setValidMatch(match);
    }, [password, confirmPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [password, confirmPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v2 = PWD_REGEX.test(password);
        if (!v2) {
            setErrMsg('Invalid Entry');
            alert(errMsg);
            return;
        }
        const dataRegister = {
            type: 'email',
            email: email,
            password: password,
        };
        try {
            const data = await authService.register(dataRegister);
            if (data?.meta && data?.meta.token) {
                localStorage.setItem('user', JSON.stringify(data));
                showNotify('Register successful!');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showNotify('Register failed!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('container')}>
            {changeSignupType ? (
                <form>
                    <div className={cx('description')}>
                        Phone
                        <a
                            href="/signup/phone-or-email/email"
                            className={cx('change-link')}
                            onClick={handleChangeSignupType}
                        >
                            Sign up with email
                        </a>
                    </div>
                    <div className={cx('phone-container')}>
                        <div className={cx('code-container')}>
                            <SearchCode />
                        </div>
                        <input name="mobile" className={cx('phone-number')} placeholder="Phone number" />
                    </div>
                    <div className={cx('send-code')}>
                        <div className={cx('input-container')}>
                            <input name="code" className={cx('input-code')} placeholder="Enter 6-digit code" />
                        </div>
                        <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                    </div>
                    <button onClick={handleSubmit} className={cx('signup-btn')}>
                        Signup
                    </button>
                </form>
            ) : (
                <form>
                    <div className={cx('description')}>
                        Email
                        <a
                            href="/signup/phone-or-email/phone"
                            className={cx('change-link')}
                            onClick={handleChangeSignupType}
                        >
                            Sign up with phone
                        </a>
                    </div>
                    {/* <User user={user} setUser={setUser} userRef={userRef} validName={validName} /> */}
                    <div className={cx('emailContainer')}>
                        <input
                            ref={userRef}
                            type="text"
                            className={cx('emailInput')}
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Password password={password} setPassword={setPassword} validPwd={validPwd} />
                    <ConfirmPassword
                        confirmPwd={confirmPwd}
                        setConfirmPwd={setConfirmPwd}
                        password={password}
                        validMatch={validMatch}
                    />
                    <div className={cx('condition')}>
                        <div className={cx('check-condition')}>
                            <input type="checkbox" className={cx('checkbox')} />
                        </div>
                        <p className={cx('text-condition')}>
                            Get trending content, newsletters, promotions, recommendations, and account updates sent to
                            your email
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className={cx('signup-btn', `${validPwd && validMatch ? '' : 'disabled-btn'}`)}
                    >
                        Signup
                    </button>
                </form>
            )}
        </div>
    );
}

export default SignupType;
