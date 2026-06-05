'use client';

import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useLayout } from '@/context/LayoutContext';

export const AppTopbar = () => {
  const { toggleSidebar } = useLayout();
  const userMenuRef = useRef<Menu>(null);

  const userMenuItems = [
    {
      label: 'Perfil',
      items: [
        { label: 'Configurações', icon: 'pi pi-cog' },
        { label: 'Sair', icon: 'pi pi-sign-out' },
      ],
    },
  ];

  return (
    <div className="layout-topbar">
      <div className="layout-topbar-start">
        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-plain layout-menu-button"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        />
        <span className="layout-topbar-logo-text">Attus</span>
      </div>

      <div className="layout-topbar-end">
        <Button
          icon="pi pi-bell"
          className="p-button-text p-button-plain p-button-rounded"
          aria-label="Notificações"
          badge="3"
          badgeClassName="p-badge-danger"
        />
        <Button
          icon="pi pi-user"
          className="p-button-text p-button-plain p-button-rounded"
          onClick={(e) => userMenuRef.current?.toggle(e)}
          aria-label="Usuário"
        />
        <Menu ref={userMenuRef} model={userMenuItems} popup />
      </div>
    </div>
  );
};