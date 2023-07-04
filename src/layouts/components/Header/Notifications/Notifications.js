import classNames from 'classnames/bind';
import styles from './Notifications.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Notifications() {
    return (
        <div className={cx('noti-container')}>
            <PopperWrapper>
                <div></div>
            </PopperWrapper>
        </div>
    );
}

export default Notifications;
