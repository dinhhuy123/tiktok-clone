import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Notify from '~/components/Notify';

function useNotify() {
    const [isShow, setIsShow] = useState(false);
    const [timeouts, setTimeouts] = useState(0);
    const [notify, setNotify] = useState('');
    const [divWrapper, setDivWrapper] = useState(true);

    const showNotify = useCallback((notify, timeout = 3000) => {
        setNotify(notify);
        setTimeouts(timeout);
        setDivWrapper((prev) => !prev);
        setIsShow(true);
    }, []);

    const NotifyComponent = () => {
        const DivOrSection = divWrapper ? 'div' : 'section';
        return (
            isShow &&
            createPortal(
                <DivOrSection>
                    <Notify timeout={timeouts} handleClose={() => setIsShow(false)}>
                        {notify}
                    </Notify>
                </DivOrSection>,
                document.body,
            )
        );
    };

    return { showNotify, NotifyComponent };
}

export default useNotify;
