// Simple page router component for navigation between pages

import React from "react";

interface PageRouterProps {
  currentPage: string;
  pages: Record<string, React.ReactNode>;
  fallback?: React.ReactNode;
}

const PageRouter: React.FC<PageRouterProps> = ({ 
  currentPage, 
  pages, 
  fallback = <div>Page not found</div> 
}) => {
  return <>{pages[currentPage] || fallback}</>;
};

export default PageRouter;