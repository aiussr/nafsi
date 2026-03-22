import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FeedbackWidget } from '@/components/shared/FeedbackWidget';
import { useLanguage } from '@/hooks/useLanguage';
import { trackPageView } from '@/lib/tracker';

export function Layout() {
  const { dir } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-dark-900 text-gray-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <FeedbackWidget />
      <Footer />
    </div>
  );
}
