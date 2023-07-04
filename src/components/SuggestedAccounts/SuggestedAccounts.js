import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import AccountItem from './AccountItem';
import styles from './SuggestedAccounts.module.scss';
// import config from '~/config';

const cx = classNames.bind(styles);

function SuggestedAccounts({ moreTitle, label, data = [], moreSugUserFunc }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            <p className={cx('more-btn')} onClick={moreSugUserFunc}>
                {moreTitle}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
