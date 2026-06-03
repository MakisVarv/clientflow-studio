import { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const value = {
    showToast: (message) => {
      setMessage(message);
      setTimeout(() => {
        setMessage('');
      }, 2500);
    },
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
      {message && <div className="toast">{message}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return context;
}
