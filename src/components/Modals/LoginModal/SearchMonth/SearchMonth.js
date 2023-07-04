import { useState } from 'react';
import classNames from 'classnames/bind';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './SearchMonth.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const MONTH_ITEMS = [
    {
        id: 1,
        item: 'January',
    },
    {
        id: 2,
        item: 'February',
    },
    {
        id: 3,
        item: 'March',
    },
    {
        id: 4,
        item: 'April',
    },
    {
        id: 5,
        item: 'May',
    },
    {
        id: 6,
        item: 'June',
    },
    {
        id: 7,
        item: 'July',
    },
    {
        id: 8,
        item: 'August',
    },
    {
        id: 9,
        item: 'September',
    },
    {
        id: 10,
        item: 'October',
    },
    {
        id: 11,
        item: 'November',
    },
    {
        id: 12,
        item: 'December',
    },
];

function SearchMonth({ month, setMonth }) {
    const [monthState, setMonthState] = useState(false);
    const [active, setActive] = useState(false);

    const handleMonth = (months) => {
        setMonth(months.item);
        setActive(true);
        setMonthState(false);
    };

    const handleModal = (e) => {
        e.stopPropagation();
        setMonthState(!monthState);
    };

    const handleHideMonth = () => {
        setMonthState(false);
    };

    return (
        <div className={cx('month-container')}>
            <HeadlessTippy
                interactive
                offset={[-60, -50]}
                visible={monthState}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <div className={cx('search-month')}>
                            <PopperWrapper className={cx('popper-wrapper', 'fix-padding')}>
                                <div className={cx('month-list-container')}>
                                    <ul className={cx('month-list')}>
                                        {MONTH_ITEMS.map((items, index) => (
                                            <li key={index} onClick={() => handleMonth(items)}>
                                                {items.item}
                                                {month === items.item && (
                                                    <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </PopperWrapper>
                        </div>
                    </div>
                )}
                onClickOutside={handleHideMonth}
            >
                <div onClick={handleModal} className={cx('mo-da-ye')}>
                    <span className={cx(active ? 'active' : '')}>{month}</span>
                    <button className={cx('search-code-btn', monthState ? 'turn-around' : 'turn-back')}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default SearchMonth;
