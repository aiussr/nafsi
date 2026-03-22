import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LiveFeedPage } from '@/pages/LiveFeedPage';
import { MapPage } from '@/pages/MapPage';
import { EconomyPage } from '@/pages/EconomyPage';
import { ArsenalPage } from '@/pages/ArsenalPage';
import { BlackoutPage } from '@/pages/BlackoutPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { SourcesPage } from '@/pages/SourcesPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/discussion/:discussionId" element={<CommunityPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
