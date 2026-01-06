import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  icon,
  title = "Loading...",
  subtitle = "Please wait while we prepare your experience"
}) => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
        {icon || <Loader2 className="animate-spin w-8 h-8 text-white" />}
      </div>
      <h2 className="text-xl font-medium text-neutral-900 mb-2">
        {title}
      </h2>
      <p className="text-neutral-600">
        {subtitle}
      </p>
    </div>
  </div>
);

export default LoadingSpinner;