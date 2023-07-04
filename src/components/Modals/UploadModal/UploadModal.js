import classNames from 'classnames/bind';
import styles from './UploadModal.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function UploadModal({ setShowUploadModal, setReplaceVideoState }) {
    const handleChangeReplace = () => {
        setReplaceVideoState(true);
        setShowUploadModal(false);
    };

    const handleContinue = () => {
        setReplaceVideoState(false);
        setShowUploadModal(false);
    };

    return (
        <div className={cx('uploadModalContainer')}>
            <PopperWrapper className={cx('upLoadModal')}>
                <div className={cx('title')}>
                    <div>Replace this video?</div>
                    <div>Caption and video settings will still be saved.</div>
                </div>
                <div className={cx('content', 'replace')} onClick={handleChangeReplace}>
                    Replace
                </div>
                <div className={cx('content', 'continue')} onClick={handleContinue}>
                    Continue editing
                </div>
            </PopperWrapper>
        </div>
    );
}

export default UploadModal;
