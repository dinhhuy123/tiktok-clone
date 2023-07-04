import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ConfirmPassword.module.scss';

const cx = classNames.bind(styles);

function ConfirmPassword({ confirmPwd, setConfirmPwd, password, validMatch }) {
    const [validConfirm, setValidConfirm] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const handleFucusConfirmPwd = () => {
        setMatchFocus(true);
        setValidConfirm(false);
    };

    const handleValidateConfirmPwd = () => {
        if (confirmPwd !== password) {
            setValidConfirm(true);
        } else {
            setValidConfirm(false);
        }
    };
    return (
        <div className={cx('confirm-pwd-container')}>
            <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                name="email"
                className={cx('confirm-pwd', `${validConfirm ? 'validate-input-confirm' : ''}`)}
                placeholder="Confirm password"
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby="confirmnote"
                onFocus={handleFucusConfirmPwd}
                onBlur={handleValidateConfirmPwd}
                required
            />
            <p id="confirmnote" className={cx(`${matchFocus && !validMatch ? 'instructions' : 'offscreen'}`)}>
                <span className={cx(`${validConfirm ? 'validate-confirm-pwd' : ''}`)}>
                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                    Must match the first password input field.
                </span>
            </p>
        </div>
    );
}

export default ConfirmPassword;
