import classNames from 'classnames/bind';
import styles from './ProfileMenu.module.scss';

const cx = classNames.bind(styles);

function ProfileMenuItem({ data }) {
    return (
        <button className={cx('menu-item')}>
            <span className={cx('icon')}>{data.icon}</span>
            <span>{data.title}</span>
        </button>
    );
}

export default ProfileMenuItem;
