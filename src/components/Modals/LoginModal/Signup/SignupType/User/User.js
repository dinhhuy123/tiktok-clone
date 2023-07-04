import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User({ user, setUser, userRef, validName }) {
    const classUserLength = useMemo(() => {
        return user.length >= 4 && user.length <= 24 ? 'valid-user-length' : '';
    }, [user]);

    const classUserCharacter = useMemo(() => {
        return /^[a-zA-Z][a-zA-Z0-9-_]/.test(user) ? 'valid-user-character' : '';
    }, [user]);

    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const handleFocusUser = () => {
        setUserFocus(true);
        setValidUser(false);
    };

    const handleValidUser = () => {
        if (!user) {
            setUserFocus(false);
            setValidUser(false);
        } else {
            if (!validName) {
                setValidUser(true);
            } else {
                setValidUser(false);
            }
        }
    };

    return (
        <div className={cx('user-container')}>
            <input
                type="text"
                ref={userRef}
                value={user}
                onChange={(e) => setUser(e.target.value)}
                name="user"
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                autoComplete="off"
                className={cx('user-name', `${validUser ? 'valid-input-user' : ''}`)}
                placeholder="Username"
                required
                onFocus={handleFocusUser}
                onBlur={handleValidUser}
            />
            <div id="uidnote" className={cx(`${userFocus && user && !validName ? 'instructions' : 'offscreen'}`)}>
                <p>Your username must have:</p>
                <span className={cx(`${validUser ? 'validate-user' : ''}`, classUserLength)}>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}></FontAwesomeIcon>4 to 24 character.
                </span>
                <span className={cx(`${validUser ? 'validate-user' : ''}`, classUserCharacter)}>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}></FontAwesomeIcon>
                    Letter, number, and special characters
                </span>
            </div>
        </div>
    );
}

export default User;
