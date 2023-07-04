import classNames from 'classnames/bind';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './SearchCode.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState } from 'react';
import { useRef } from 'react';

const cx = classNames.bind(styles);

const CODE_ITEMS = [
    {
        id: 1,
        item: 'Afghanistan +93',
        code: 'AF +93',
    },
    {
        id: 2,
        item: 'Åland Islands +35818',
        code: 'AX +35818',
    },
    {
        id: 3,
        item: 'Albania +355',
        code: 'AL +355',
    },
    {
        id: 4,
        item: 'Algeria +213',
        code: 'DZ +213',
    },
    {
        id: 5,
        item: 'American Samoa +1684',
        code: 'AS +1684',
    },
    {
        id: 6,
        item: 'Andorra +376',
        code: 'AD +376',
    },
    {
        id: 7,
        item: 'Angola +244',
        code: 'AO +244',
    },
    {
        id: 8,
        item: 'Anguilla +1264',
        code: 'AI +1264',
    },
    {
        id: 9,
        item: 'Antigua & Barbuda +1268',
        code: 'AG +1268',
    },
    {
        id: 10,
        item: 'Argentina +54',
        code: 'AR +54',
    },
    {
        id: 11,
        item: 'Armenia +374',
        code: 'AM +374',
    },
    {
        id: 12,
        item: 'Aruba +297',
        code: 'AW +297',
    },
    {
        id: 13,
        item: 'Ascension Island +247',
        code: 'SH +247',
    },
];

function SearchCode() {
    const [codeZone, setCodeZone] = useState(CODE_ITEMS);
    const [codeState, setCodeState] = useState(false);
    const [codeInput, setCodeInput] = useState('');
    const [code, setCode] = useState('VN +84');

    const inputRef = useRef();
    // const [state, setState] = useState(false);
    const searchCode = CODE_ITEMS;

    const handleSearch = (value) => {
        setCodeInput(value);
        const newValue = value.toLowerCase();
        const searchItems = searchCode.filter((items) => {
            return items.item.toLowerCase().indexOf(newValue) !== -1;
        });
        const newItems = searchItems.map((items) => {
            const lengthVa = value.length;
            let arr = [];
            let newArray = [];
            // console.log(items.item);
            for (var i in newValue) {
                const newIndex = [];
                for (var j in items.item) {
                    if (items.item[j].toLowerCase() === newValue[i]) {
                        newIndex.push(Number(j - i));
                    }
                }
                newArray.push(newIndex);
            }
            // console.log('newArray', newArray);
            const index = newArray[lengthVa - 1];
            index.push(items.item.length);
            if (newArray[lengthVa - 1][0] !== 0) {
                const sliceStr = items.item.slice(0, newArray[lengthVa - 1][0]);
                arr.push(sliceStr);
            }
            // console.log('arr1', arr);
            for (var m = 1; m < index.length; m++) {
                const curr = index[m - 1];
                const acc = index[m];
                arr.push(items.item.slice(curr, curr + lengthVa));
                arr.push(items.item.slice(curr + lengthVa, acc));
            }
            // console.log('arr2', arr);
            return { id: items.id, item: arr, code: items.code };
        });
        // console.log('newItems', newItems);
        setCodeZone(newItems);
    };

    const handleHideCode = () => {
        setCodeState(false);
    };

    const handleCode = (codex) => {
        setCode(codex.code);
        setCodeState(false);
        setCodeZone(CODE_ITEMS);
        setCodeInput('');
        inputRef.current.focus();
    };

    return (
        <HeadlessTippy
            interactive
            offset={[-50, 0]}
            visible={codeState}
            render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                    <div className={cx('search-code')}>
                        <PopperWrapper className={cx('popper-wrapper')}>
                            <div className={cx('search-container')}>
                                <button className={cx('search-btn')}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                                <input
                                    ref={inputRef}
                                    value={codeInput}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className={cx('search-input')}
                                    placeholder="Search"
                                />
                            </div>
                            <div className={cx('code-list-container')}>
                                <ul className={cx('code-list')}>
                                    {codeZone.map((items) => (
                                        <li key={items.id} onClick={() => handleCode(items)}>
                                            {items.item}
                                            {code === items.code && (
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
            onClickOutside={handleHideCode}
        >
            <div onClick={() => setCodeState(!codeState)} className={cx('zone-code')}>
                <span className={cx('vn-code')}>{code}</span>
                <button className={cx('search-code-btn', codeState ? 'turn-around' : 'turn-back')}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default SearchCode;
