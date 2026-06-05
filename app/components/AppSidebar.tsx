'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayout } from '@/context/LayoutContext';

interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  items?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboards',
    icon: 'pi pi-chart-bar',
    href: '/',
  },
  {
    label: 'Pedidos',
    icon: 'pi pi-shopping-cart',
    href: '/pedidos',
  },
  {
    label: 'Vender',
    icon: 'pi pi-cart-arrow-down',
    href: '/vender',
  },
  {
    label: 'Venderdores',
    icon: 'pi pi-user',
    href: '/vendedores',
  },
  {
    label: 'Clientes',
    icon: 'pi pi-users',
    href: '/clientes',
  }
];

interface AppMenuItemProps {
  item: MenuItem;
  depth?: number;
}

const AppMenuItem = ({ item, depth = 0 }: AppMenuItemProps) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(false);
  const { closeSidebar } = useLayout();
  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.items && item.items.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded((prev) => !prev);
    } else if (window.innerWidth < 992) {
      closeSidebar();
    }
  };

  const content = (
    <div
      className={`layout-menuitem-root ${isActive ? 'active-menuitem' : ''}`}
      onClick={handleClick}
      style={{ paddingLeft: `${depth * 1}rem` }}
    >
      <i className={`layout-menuitem-icon ${item.icon}`} />
      <span className="layout-menuitem-text">{item.label}</span>
      {hasChildren && (
        <i className={`layout-submenu-toggler pi pi-chevron-right ${expanded ? 'expanded' : ''}`} />
      )}
    </div>
  );

  return (
    <li className={`layout-menuitem ${isActive ? 'active-route' : ''}`}>
      {item.href && !hasChildren ? (
        <Link href={item.href}>{content}</Link>
      ) : (
        content
      )}
      {hasChildren && (
        <ul className={`layout-submenu ${expanded ? 'expanded' : ''}`}>
          {item.items!.map((child, i) => (
            <AppMenuItem key={i} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const AppSidebar = () => {
  return (
    <nav className="layout-sidebar-nav">
      <ul className="layout-menu">
        {menuItems.map((item, i) => (
          <AppMenuItem key={i} item={item} />
        ))}
      </ul>
    </nav>
  );
};