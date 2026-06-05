'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LayoutContextType {
  sidebarVisible: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  sidebarVisible: true,
  sidebarCollapsed: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth < 992) {
      setSidebarVisible((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarVisible(false);
  }, []);

  return (
    <LayoutContext.Provider value={{ sidebarVisible, sidebarCollapsed, toggleSidebar, closeSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);