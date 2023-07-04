import classNames from 'classnames/bind';
import styles from './ProfileMenu.module.scss';
import { ArrowDownIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Footer({ onWide }) {
    return (
        <div className={cx('footer')}>
            <button className={cx('arrow-down-btn')} onClick={onWide}>
                <ArrowDownIcon />
            </button>
        </div>
    );
}

export default Footer;
