import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function ConfirmModal({ handleClose, description, agree, cancel }) {
    return (
        <div className={cx('uploadModalContainer')}>
            <PopperWrapper className={cx('upLoadModal', 'noPadding')}>
                <section>{description || 'Confirm'}</section>
                <footer onClick={handleClose}>
                    <div>{agree || 'OK'}</div>
                    <div>{cancel || 'Cancel'}</div>
                </footer>
            </PopperWrapper>
        </div>
    );
}

export default ConfirmModal;
