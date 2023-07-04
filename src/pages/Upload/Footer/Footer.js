import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { SelectLanguageIcon, UploadFooterIcon, UploadFooterTitleIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Footer() {
    const [language, setLanguage] = useState('English');
    return (
        <div className={cx('uploadFooter')}>
            <div className={cx('uploadFooterContainer')}>
                <footer className={cx('uploadFooterContent')}>
                    <div className={cx('footerIcon')}>
                        <div className={cx('iconsContainer')}>
                            <UploadFooterIcon />
                            <UploadFooterTitleIcon />
                        </div>
                    </div>
                    <div className={cx('footerContentColumn')}>
                        <h4>Company</h4>
                        <span>
                            <a href="/">About</a>
                        </span>
                        <span>
                            <a href="/">Newsroom</a>
                        </span>
                        <span>
                            <a href="/">Contact</a>
                        </span>
                        <span>
                            <a href="/">Careers</a>
                        </span>
                        <span>
                            <a href="/">ByteDance</a>
                        </span>
                    </div>
                    <div className={cx('footerContentColumn')}>
                        <h4>Programs</h4>
                        <span>
                            <a href="/">TikTok for Good</a>
                        </span>
                        <span>
                            <a href="/">Advertise</a>
                        </span>
                        <span>
                            <a href="/">Developers</a>
                        </span>
                        <span>
                            <a href="/">TikTok Rewards</a>
                        </span>
                        <span>
                            <a href="/">TikTok Embeds</a>
                        </span>
                    </div>
                    <div className={cx('footerContentColumn')}>
                        <h4>Support</h4>
                        <span>
                            <a href="/">Help Center</a>
                        </span>
                        <span>
                            <a href="/">Safety Center</a>
                        </span>
                        <span>
                            <a href="/">Creator Portal</a>
                        </span>
                        <span>
                            <a href="/">Community Guidelines</a>
                        </span>
                        <span>
                            <a href="/">Transparency</a>
                        </span>
                        <span>
                            <a href="/">Accessibility</a>
                        </span>
                    </div>
                    <div className={cx('footerContentColumn')}>
                        <h4>Legal</h4>
                        <span>
                            <a href="/">Terms of use</a>
                        </span>
                        <span>
                            <a href="/">Privacy Policy</a>
                        </span>
                    </div>
                </footer>
                <div className={cx('footerLanguageContainer')}>
                    <div className={cx('languageContainer')}>
                        <p>
                            <span>{language}</span>
                        </p>
                        <SelectLanguageIcon />
                        <select onChange={(e) => setLanguage(e.target.value)}>
                            <option value="ar">العربية</option>
                            <option value="bn-In">বাঙ্গালি (ভারত)</option>
                            <option value="ceb-PH">Cebuano (Pilipinas)</option>
                            <option value="cs-CZ">Čeština (Česká republika)</option>
                            <option value="de-DE">Deutsch</option>
                            <option value="el-GR">Ελληνικά (Ελλάδα)</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fi-FI">Suomi (Suomi)</option>
                            <option value="fil-PH">Filipino (Pilipinas)</option>
                            <option value="fr">Français</option>
                            <option value="he-IL">עברית (ישראל)</option>
                            <option value="hi-IN">हिंदी</option>
                            <option value="hu-HU">Magyar (Magyarország)</option>
                            <option value="id-ID">Bahasa Indonesia (Indonesia)</option>
                            <option value="it-IT">Italiano (Italia)</option>
                        </select>
                    </div>
                    <div className={cx('year')}>© 2023 TikTok</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
