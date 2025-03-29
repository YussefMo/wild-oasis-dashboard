import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DarkModeProvider>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.replace('/')}
            >
                <App />
            </ErrorBoundary>
        </DarkModeProvider>
    </StrictMode>
);
