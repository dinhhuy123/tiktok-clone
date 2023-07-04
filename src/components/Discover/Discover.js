import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Discover.modules.scss';
import Button from '~/components/Button';
import { HashtagIcon, MusicIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Discover({ label, className }) {
    return (
        <div className={cx('discoverWrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('discover-btn')}>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title', className)}>suthatla</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title', className)}>mackedoi</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title', className)}>sansangthaydoi</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title', className)}>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title', className)}>
                        Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng
                    </p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title', className)}>Thiên Thần Tình Yêu - RICKY STAR</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title', className)}>7749hieuung</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title', className)}>genzlife</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title', className)}>Tình Đã Đầy Một Tim - Huyền Tâm Môn</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title', className)}>
                        Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham
                    </p>
                </Button>
            </div>
        </div>
    );
}

Discover.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Discover;
