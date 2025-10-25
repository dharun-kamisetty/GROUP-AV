import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Components
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Pages
import { HomePage } from '@/pages/HomePage';
import { TriagePage } from '@/pages/TriagePage';
import { VoicePage } from '@/pages/VoicePage';
import { ResultsPage } from '@/pages/ResultsPage';
import { FacilitiesPage } from '@/pages/FacilitiesPage';
import { SettingsPage } from '@/pages/SettingsPage';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent: React.FC = () => {
  const { i18n } = useTranslation();

  // Update document direction for RTL languages (if needed in future)
  React.useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: (theme) => theme.palette.background.default
    }}>
      {/* Header with Navigation and Language Selector */}
      <Box component="header" sx={{ 
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        background: (theme) => theme.palette.background.paper,
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 1
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            py: 2
          }}>
            <Navigation />
            <LanguageSelector />
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/triage" element={<TriagePage />} />
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{
        mt: 'auto',
        py: 3,
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
        background: (theme) => theme.palette.background.paper,
        color: 'text.secondary'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ typography: 'body2' }}>
            © 2025 Arovia - AI Health Desk Agent. All rights reserved.
            <br />
            Powered by AI for better healthcare access in India.
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
