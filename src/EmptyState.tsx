import React from "react";
import { Package } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = "Nothing here yet",
  subtitle = "Get started by adding some items",
  actionText = "Get Started",
  onAction
}) => (
  <div className="text-center py-20">
    <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-8">
      {icon || <Package className="h-12 w-12 text-neutral-400" />}
    </div>
    <h3 className="text-2xl font-light text-neutral-900 mb-4">
      {title}
    </h3>
    <p className="text-neutral-600 mb-8">
      {subtitle}
    </p>
    {onAction && (
      <button
        onClick={onAction}
        type="button"
        className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-all duration-200 shadow-sm"
      >
        {actionText}
      </button>
    )}
  </div>
);

export default EmptyState;