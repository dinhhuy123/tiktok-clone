import { useState } from 'react';
import classNames from 'classnames/bind';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './SearchDay.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const DAY_ITEMS = [
    {
        item: 1,
    },
    {
        item: 2,
    },
    {
        item: 3,
    },
    {
        item: 4,
    },
    {
        item: 5,
    },
    {
        item: 6,
    },
    {
        item: 7,
    },
    {
        item: 8,
    },
    {
        item: 9,
    },
    {
        item: 10,
    },
    {
        item: 11,
    },
    {
        item: 12,
    },
    {
        item: 13,
    },
    {
        item: 14,
    },
    {
        item: 15,
    },
    {
        item: 16,
    },
    {
        item: 17,
    },
    {
        item: 18,
    },
    {
        item: 19,
    },
    {
        item: 20,
    },
    {
        item: 21,
    },
    {
        item: 22,
    },
    {
        item: 23,
    },
    {
        item: 24,
    },
    {
        item: 25,
    },
    {
        item: 26,
    },
    {
        item: 27,
    },
    {
        item: 28,
    },
    {
        item: 29,
    },
    {
        item: 30,
    },
    {
        item: 31,
    },
];

function SearchDay({ day, setDay }) {
    const [dayState, setDayState] = useState(false);
    const [active, setActive] = useState(false);

    const handleDay = (days) => {
        setDay(days.item);
        setActive(true);
        setDayState(false);
    };

    const handleModal = (e) => {
        e.stopPropagation();
        setDayState(!dayState);
    };

    const handleHideDay = () => {
        setDayState(false);
    };
    return (
        <div className={cx('day-container')}>
            <HeadlessTippy
                interactive
                offset={[-60, -50]}
                visible={dayState}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <div className={cx('search-day')}>
                            <PopperWrapper className={cx('popper-wrapper', 'fix-padding')}>
                                <div className={cx('day-list-container')}>
                                    <ul className={cx('day-list')}>
                                        {DAY_ITEMS.map((items, index) => (
                                            <li key={index} onClick={() => handleDay(items)}>
                                                {items.item}
                                                {day === items.item && (
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
                onClickOutside={handleHideDay}
            >
                <div onClick={handleModal} className={cx('mo-da-ye')}>
                    <span className={cx(active ? 'active' : '')}>{day}</span>
                    <button className={cx('search-code-btn', dayState ? 'turn-around' : 'turn-back')}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default SearchDay;
