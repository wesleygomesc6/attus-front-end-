import type { Metadata } from 'next';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '@/context/LayoutContext';

// PrimeReact styles
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Layout styles
import '@/styles/layout.css';
import { AppLayout } from './components/AppLayout';
import ReactQueryProvider from '@/context/ReactQueryContext';

export const metadata: Metadata = {
  title: 'Attus',
  description: 'Aplicação Next.js com PrimeReact',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryProvider>
          <PrimeReactProvider>
            <LayoutProvider>
              <AppLayout>{children}</AppLayout>
            </LayoutProvider>
          </PrimeReactProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}