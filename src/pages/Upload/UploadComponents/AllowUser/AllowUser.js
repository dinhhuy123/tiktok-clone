import classNames from 'classnames/bind';
import styles from './AllowUser.module.scss';
import { CheckedBoxIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const ALLOW_USERS = [
    {
        id: 1,
        title: 'Comment',
    },
    {
        id: 2,
        title: 'Duet',
    },
    {
        id: 3,
        title: 'Stitch',
    },
];

function AllowUser({ allowUser, setAllowUser }) {
    console.log(allowUser);

    const handleCheckedBox = (title) => {
        setAllowUser((prev) => {
            const isChecked = allowUser.includes(title);
            if (isChecked) {
                return allowUser.filter((item) => item !== title);
            } else {
                return [...prev, title];
            }
        });
    };

    return (
        <div className={cx('allowUsers')}>
            <div className={cx('title')}>
                <span>Allow users to</span>
            </div>
            <div className={cx('checkedBoxesContainer')}>
                {ALLOW_USERS.map((item) => (
                    <div
                        key={item.id}
                        className={cx('checkedBox')}
                        // onClick={() => handleCheckedBox(allowUser.id, allowUser.title)}
                    >
                        <div className={cx('checkedBoxCustom')}>
                            <input
                                checked={allowUser.includes(item.title.toLowerCase())}
                                className={cx('visible')}
                                type="checkbox"
                                onChange={() => handleCheckedBox(item.title.toLowerCase())}
                            />
                            <div className={cx(allowUser.includes(item.title.toLowerCase()) ? 'custom' : 'unchecked')}>
                                {allowUser.includes(item.title.toLowerCase()) && (
                                    <CheckedBoxIcon className={cx('checkedBoxIcon')} />
                                )}
                            </div>
                        </div>
                        <span>{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllowUser;
