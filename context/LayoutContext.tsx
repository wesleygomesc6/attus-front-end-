'use client';

import { Toast } from 'primereact/toast';
import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';

interface LayoutContextType {
  sidebarVisible: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  exibirNotificacao: (notificacao: Notificacao) => void
}

interface Notificacao {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  summary: string
  detail: string
}


const LayoutContext = createContext<LayoutContextType>({
  sidebarVisible: true,
  sidebarCollapsed: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  exibirNotificacao: () => {}
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

   const toast = useRef<Toast>(null)

  const exibirNotificacao = (notificacao: Notificacao) => {
    toast.current?.show({ ...notificacao, life: 6000 })
  }


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
    <LayoutContext.Provider value={{ sidebarVisible, sidebarCollapsed, toggleSidebar, closeSidebar, exibirNotificacao }}>
       <Toast ref={toast} />
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);