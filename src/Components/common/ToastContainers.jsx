import React from 'react';
import { ToastContainer } from 'react-toastify';

function ToastContainers() {
  return (
    <ToastContainer
    position="top-right"
    autoClose={1}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  )
}

export default ToastContainers;
