import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LiveFeedPage } from '@/pages/LiveFeedPage';
import { MapPage } from '@/pages/MapPage';
import { EconomyPage } from '@/pages/EconomyPage';
import { ArsenalPage } from '@/pages/ArsenalPage';
import { BlackoutPage } from '@/pages/BlackoutPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { SourcesPage } from '@/pages/SourcesPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<LiveFeedPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/economy" element={<EconomyPage />} />
          <Route path="/arsenal" element={<ArsenalPage />} />
          <Route path="/blackouts" element={<BlackoutPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/sources" element={<SourcesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
