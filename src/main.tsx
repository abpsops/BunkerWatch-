import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {applyTheme, followSystemTheme, getInitialTheme} from './utils/theme';
import './index.css';

// Set the theme before the first render so there is no flash of the wrong one.
applyTheme(getInitialTheme());
followSystemTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
