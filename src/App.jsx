import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Bounce, ToastContainer } from 'react-toastify';

import AppLayout from './ui/AppLayout';

import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Booking from './pages/Booking';
import CheckIn from './pages/CheckIn';
import ProtectedRout from './ui/ProtectedRout';

import GlobalStyle from './styles/GlobalStyle';
import { useDarkMode } from './context/DarkModeContext';

const queryClint = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000
            staleTime: 0
        }
    }
});

function App() {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            <ToastContainer
                closeButton
                theme={isDarkMode ? 'dark' : 'light'}
                position="top-center"
                transition={Bounce}
            />
            <QueryClientProvider client={queryClint}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRout>
                                    <AppLayout />
                                </ProtectedRout>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to="dashboard" />}
                            />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="bookings" element={<Bookings />} />
                            <Route path="cabins" element={<Cabins />} />
                            <Route path="users" element={<Users />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="account" element={<Account />} />
                            <Route
                                path="bookings/:bookingId"
                                element={<Booking />}
                            />
                            <Route
                                path="check-in/:bookingId"
                                element={<CheckIn />}
                            />
                        </Route>

                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}

export default App;
