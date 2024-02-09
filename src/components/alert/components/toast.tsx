import { Alert } from '@material-tailwind/react';
import React from 'react';
import '../core/styles.css';
import { ToastProps } from '../core/types';
import { ErrorIcon, SuccessIcon } from './assets';
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
