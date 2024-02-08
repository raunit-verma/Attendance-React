import React, { useEffect } from 'react';
import { ToastProps } from '../core/types';
import '../core/styles.css';
import { ErrorIcon, LoadingIcon, SuccessIcon } from './assets';
import { Alert } from '@material-tailwind/react';
const Toast = ({ toast }: ToastProps) => {
  
  const [open, setOpen] = React.useState(true);
  return (
    <div
      className={`toast-${toast.state}`}
      key={toast.id}
    >
      <Alert icon={toast.type === "success" ? SuccessIcon : ErrorIcon} open={open} onClose={() => setOpen(false)}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      color={toast.type === "success" ? "green" : "red"}
      >
        {toast.title}
      </Alert>
    </div>
  );
};

export { Toast };
