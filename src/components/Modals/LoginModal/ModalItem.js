import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './LoginModal.module.scss';

const cx = classNames.bind(styles);

function ModalItem({ data, onClick }) {
    return (
        <Button upload modalIcon={data.icon} className={cx('register-btn')} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

ModalItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ModalItem;
