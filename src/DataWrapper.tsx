// Data wrapper component for handling loading and error states

import React from "react";

interface DataWrapperProps {
  isLoading: boolean;
  error: Error | null;
  loadingComponent: React.ReactNode;
  errorComponent: React.ReactNode;
  children: React.ReactNode;
}

const DataWrapper: React.FC<DataWrapperProps> = ({
  isLoading,
  error,
  loadingComponent,
  errorComponent,
  children,
}) => {
  if (isLoading) return <>{loadingComponent}</>;
  if (error) return <>{errorComponent}</>;
  return <>{children}</>;
};

export default DataWrapper;