import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
// import images from '~/assets/images/';
import { EditProfileIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import * as authService from '~/services/authService';
import { NotifyContextShow } from '~/contexts/NotifyContext';

const cx = classNames.bind(styles);

function EditProfileModal({ setModal, userProfile, accessToken }) {
    const [username, setUsername] = useState(userProfile.nickname);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState({ url: userProfile.avatar });
    const [bio, setBio] = useState(userProfile.bio);

    const showNotify = useContext(NotifyContextShow);

    const handleInputFile = () => {
        document.getElementById('inputFile').click();
    };

    const getImage = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const types = ['image/jpeg', 'image/jpg', 'image/png'];
        if (types.includes(file.type)) {
            file.url = URL.createObjectURL(file);
            setAvatar(file);
        }
    };

    const handleUpdateCurrentUser = async (e) => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        e.preventDefault();
        const dataCurrentUser = {
            first_name: firstName,
            last_name: lastName,
            bio,
        };

        Object.keys(dataCurrentUser).forEach((key) => {
            dataCurrentUser[key] && formData.append(key, dataCurrentUser[key]);
        });
        const data = await authService.updateCurrentUser(formData, accessToken);
        if (data) {
            showNotify('Update successfully!', 3000);
            window.location.reload();
        } else {
            showNotify('Update failed!', 3000);
        }
    };

    return (
        <div className={cx('modalContainer')}>
            <PopperWrapper className={cx('noPadding')}>
                <div className={cx('headerOfEdit')}>
                    Edit profile
                    <div className={cx('closeBtn')} onClick={() => setModal(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <div className={cx('bodyOfEdit')}>
                    <div className={cx('sectionPhoto', 'customPadding')}>
                        <div className={cx('sectionName')}>Profile photo</div>
                        <div className={cx('sectionAvatar')}>
                            <div className={cx('avatarContainer')} onClick={handleInputFile}>
                                <span>
                                    <img src={avatar.url} alt={userProfile.nickname} className={cx('avatar')} />
                                </span>
                            </div>
                            <div className={cx('editBtnContainer')}>
                                <EditProfileIcon className={cx('editIcon')} />
                                <input
                                    type="file"
                                    className={cx('inputFile')}
                                    id="inputFile"
                                    accept="image/*"
                                    onChange={getImage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('sectionUsername', 'customPadding')}>
                        <div className={cx('sectionName')}>First name</div>
                        <div className={cx('sectionInput')}>
                            <input
                                className={cx('inputUsername')}
                                value={firstName}
                                placeholder="first name"
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('sectionUsername', 'customPadding')}>
                        <div className={cx('sectionName')}>Last Name</div>
                        <div className={cx('sectionInput')}>
                            <input
                                className={cx('inputUsername')}
                                value={lastName}
                                placeholder="last name"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('sectionUsername', 'customPadding')}>
                        <div className={cx('sectionName')}>Username</div>
                        <div className={cx('sectionInput')}>
                            <input
                                className={cx('inputUsername')}
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <p className={cx('linkPreview', 'paragraphStyle')}>www.tiktok.com/@{username}</p>
                            <p className={cx('description', 'paragraphStyle')}>
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                username will also change your profile link.
                            </p>
                        </div>
                    </div>
                    {/* <div className={cx('sectionNickname', 'customPadding')}>
                        <div className={cx('sectionName')}>Name</div>
                        <div className={cx('sectionInput')}>
                            <input className={cx('inputUsername')} placeholder="name" />
                            <p className={cx('description', 'paragraphStyle')}>
                                Your nickname can only be changed once every 7 days.
                            </p>
                        </div>
                    </div> */}
                    <div className={cx('sectionBio', 'customPadding')}>
                        <div className={cx('sectionName')}>Bio</div>
                        <div className={cx('sectionInput')}>
                            <textarea
                                className={cx('bio')}
                                placeholder="Bio"
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <p className={cx('description', 'paragraphStyle')}>0/80</p>
                        </div>
                    </div>
                </div>
                <div className={cx('footerOfEdit')}>
                    <Button upload>Cancel</Button>
                    <Button upload onClick={handleUpdateCurrentUser}>
                        Save
                    </Button>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default EditProfileModal;
