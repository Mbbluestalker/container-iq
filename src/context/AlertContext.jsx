import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/common/Alert';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newAlert = { id, message, type, duration };

    setAlerts((prev) => [...prev, newAlert]);

    if (duration) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const showSuccess = (message, duration) => showAlert(message, 'success', duration);
  const showError = (message, duration) => showAlert(message, 'error', duration);
  const showWarning = (message, duration) => showAlert(message, 'warning', duration);
  const showInfo = (message, duration) => showAlert(message, 'info', duration);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}

      {/* Alert Container - Fixed position at top right */}
      <div className="fixed top-4 right-4 z-50 max-w-md w-full space-y-2">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            duration={alert.duration}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
