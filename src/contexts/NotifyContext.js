import { createContext } from 'react';
import useNotify from '~/hooks/useNotify';

export const NotifyContextShow = createContext();

function NotifyContext({ children }) {
    const { showNotify, NotifyComponent } = useNotify();
    return (
        <NotifyContextShow.Provider value={showNotify}>
            {children}
            <NotifyComponent />
        </NotifyContextShow.Provider>
    );
}

export default NotifyContext;
