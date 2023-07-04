import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Viewable.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const VIEWABLE = [
    {
        id: 1,
        label: 'Public',
    },
    {
        id: 2,
        label: 'Friends',
    },
    {
        id: 3,
        label: 'Private',
    },
];

function Viewable({ limit, setLimit, viewable, handleViewable }) {
    return (
        <div className={cx('whoCanWatch')}>
            <div className={cx('title')}>
                <span>Who can watch this video</span>
            </div>
            <Tippy
                interactive
                offset={[0, -180]}
                visible={limit}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <div className={cx('itemsContainer')}>
                            <PopperWrapper className={cx('noPadding')}>
                                <div className={cx('items')}>
                                    <ul>
                                        {VIEWABLE.map((viewable) => (
                                            <li key={viewable.id} onClick={() => handleViewable(viewable.label)}>
                                                {viewable.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </PopperWrapper>
                        </div>
                    </div>
                )}
            >
                <div className={cx('choiceContainer')} onClick={() => setLimit(!limit)}>
                    <div className={cx('choices')}>
                        <span>{viewable}</span>
                    </div>
                    <button className={cx('searchBtn', limit ? 'turnAround' : 'turnBack')}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Viewable;
