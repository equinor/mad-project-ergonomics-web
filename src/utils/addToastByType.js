import toastr from 'toastr';

export const ToastTypes = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const addToast = (toast) => {
  toastr[toast.type || ToastTypes.INFO](toast.text);
};
