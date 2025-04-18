import React from 'react';

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default Error;