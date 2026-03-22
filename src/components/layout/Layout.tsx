import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLanguage } from '@/hooks/useLanguage';

export function Layout() {
  const { dir } = useLanguage();

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-dark-900 text-gray-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
