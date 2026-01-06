import React from "react";

interface ErrorStateProps {
  error: Error;
  icon?: React.ReactNode;
  title?: string;
  onRetry?: () => void;
  retryText?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  icon,
  title = "Something went wrong",
  onRetry = () => globalThis.location.reload(),
  retryText = "Try Again"
}) => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon || <div className="w-8 h-8 bg-red-600 rounded-full" />}
      </div>
      <h2 className="text-xl font-medium text-neutral-900 mb-2">
        {title}
      </h2>
      <p className="text-neutral-600 mb-4">{error.message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="bg-black text-white px-6 py-2 rounded-full hover:bg-neutral-800 transition-colors"
      >
        {retryText}
      </button>
    </div>
  </div>
);

export default ErrorState;