import { addToast, ToastTypes } from './addToastByType';

const invalidRequestMessage = 'Invalid request';
const notAuthorizedMessage = 'User is not authorized to access this';
const notPermissionToViewMessage = 'Your user does not have permission to view this feed. Please contact support.';
const genericErrorMessage = 'An error happened';
const processingErrorMessage = 'The API is having trouble processing this request.';

export default function handelError(ex) {
  if (ex.status === 400) {
    addToast({ text: invalidRequestMessage, type: ToastTypes.ERROR });
  } else if (ex.status === 401) {
    addToast({ text: notAuthorizedMessage, type: ToastTypes.ERROR });
  } else if (ex.status === 403) {
    addToast({ text: notPermissionToViewMessage, type: ToastTypes.ERROR });
  } else if (ex.status === 500) {
    addToast({ text: processingErrorMessage, type: ToastTypes.ERROR });
  } else {
    addToast({ text: genericErrorMessage, type: ToastTypes.ERROR });
  }
}
