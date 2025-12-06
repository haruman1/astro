import { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, options = {}) => {
    const id = Date.now();

    const toast = {
      id,
      message,
      type: options.type ?? '',
      duration: options.duration ?? 3000,
    };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Render Toast */}
      <div className="fixed top-4 right-4 space-y-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              px-4 py-2 rounded-lg shadow-lg text-white
              ${toast.type === 'error' ? 'bg-red-500' : ''}
              ${toast.type === 'success' ? 'bg-green-500' : ''}
              ${toast.type === 'info' ? 'bg-blue-500' : ''}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return ctx;
}
