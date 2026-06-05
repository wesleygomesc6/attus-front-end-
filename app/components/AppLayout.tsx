'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AppTopbar } from './AppTopbar';
import { AppSidebar } from './AppSidebar';
import { useLayout } from '@/context/LayoutContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { sidebarVisible, sidebarCollapsed, closeSidebar } = useLayout();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) closeSidebar();
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [closeSidebar]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobile &&
        sidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        closeSidebar();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarVisible, closeSidebar]);

  const layoutClasses = [
    'layout-wrapper',
    sidebarCollapsed ? 'layout-sidebar-collapsed' : '',
    isMobile && sidebarVisible ? 'layout-mobile-sidebar-active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={layoutClasses}>
      {isMobile && sidebarVisible && (
        <div className="layout-mask" onClick={closeSidebar} />
      )}

      <div ref={sidebarRef} className={`layout-sidebar ${sidebarVisible ? 'active' : ''}`}>
        <div className="layout-sidebar-header">
          <span className="layout-sidebar-logo">
            <i className="pi pi-prime" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }} />
            <span className="layout-sidebar-logo-text">Attus</span>
          </span>
        </div>
        <AppSidebar />
      </div>

      <div className="layout-main-container">
        <AppTopbar />
        <div className="layout-main">
          {children}
        </div>
      </div>
    </div>
  );
};