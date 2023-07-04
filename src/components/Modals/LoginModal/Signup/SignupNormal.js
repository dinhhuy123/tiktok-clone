import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Signup.module.scss';
import SearchMonth from '../SearchMonth';
import SearchDay from '../SearchDay';
import SearchYear from '../SearchYear';
import SignupType from './SignupType';

const cx = classNames.bind(styles);

function SignupNormal({ title }) {
    const [month, setMonth] = useState('Month');
    const [day, setDay] = useState('Day');
    const [year, setYear] = useState('Year');
    const [success, setSuccess] = useState(false);

    return (
        <>
            {success ? (
                <div>
                    <h4 className={cx('header-title')}>Successful</h4>
                    <button className={cx('sign-in-btn')}>
                        <a href="/">Sign in</a>
                    </button>
                </div>
            ) : (
                <div className={cx('form-input')}>
                    <h4 className={cx('header-title')}>{title}</h4>
                    <div>
                        <div className={cx('description')}>When's your birthday?</div>
                        <div className={cx('birthday')}>
                            <SearchMonth month={month} setMonth={setMonth} />
                            <SearchDay day={day} setDay={setDay} />
                            <SearchYear year={year} setYear={setYear} />
                        </div>
                        <p className={cx('privacy')}>Your birthday won't be shown publicly.</p>
                        <SignupType setSuccess={setSuccess} month={month} day={day} year={year} />
                    </div>
                </div>
            )}
        </>
    );
}

export default SignupNormal;
