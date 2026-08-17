import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <AlertCircle size={20} aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
