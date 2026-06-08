import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { EditorProvider } from './context/EditorContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <EditorProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
        </BrowserRouter>
      </EditorProvider>
    </ThemeProvider>
  </React.StrictMode>
);
