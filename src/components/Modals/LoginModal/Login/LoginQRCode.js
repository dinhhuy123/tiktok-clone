import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { SecondStepIcon, ThirdStepIcon } from '~/components/Icons';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function LoginQRCode({ title }) {
    return (
        <div className={cx('login-qr')}>
            <h4 className={cx('header-title')}>{title}</h4>
            <div className={cx('qr-container')}>
                <div className={cx('text-container')}>
                    <img
                        className={cx('qr-image')}
                        src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"
                        alt="qrCode"
                    />
                    <div className={cx('step-container')}>
                        <p className={cx('tiktok-step')}>1. Open the TikTok app on your mobile device</p>
                        <p className={cx('tiktok-step')}>
                            2. On Profile, tap
                            <SecondStepIcon />
                        </p>
                        <p className={cx('tiktok-step')}>
                            3. Tap
                            <ThirdStepIcon />
                            and scan the QR code to confirm your login
                        </p>
                    </div>
                </div>
                <img
                    className={cx('phone-image')}
                    src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp/main/webapp-desktop/b6d3cc69d3525571aef0.gif"
                    alt="phone"
                />
            </div>
        </div>
    );
}

LoginQRCode.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LoginQRCode;
