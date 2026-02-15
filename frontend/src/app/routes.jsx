import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { LandingPage } from './components/LandingPage.jsx';
import { TriageForm } from './components/TriageForm.jsx';
import { VoiceInput } from './components/VoiceInput.jsx';
import { Results } from './components/Results.jsx';
import { Facilities } from './components/Facilities.jsx';
import { Settings } from './components/Settings.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { useEffect, useState } from 'react';

function RootLayout() {
  const location = useLocation();
  const [urgencyScore, setUrgencyScore] = useState();
  const [emergencyDetected, setEmergencyDetected] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (state?.result) {
      setUrgencyScore(state.result.urgencyScore);
      setEmergencyDetected(state.result.emergencyDetected);
    } else {
      if (!location.pathname.includes('/results') && !location.pathname.includes('/facilities')) {
        setUrgencyScore(undefined);
        setEmergencyDetected(false);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header 
        urgencyScore={urgencyScore} 
        emergencyDetected={emergencyDetected} 
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: 'triage',
        Component: TriageForm,
      },
      {
        path: 'voice',
        Component: VoiceInput,
      },
      {
        path: 'results',
        Component: Results,
      },
      {
        path: 'facilities',
        Component: Facilities,
      },
      {
        path: 'settings',
        Component: Settings,
      },
      {
        path: '*',
        Component: () => {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
                <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                  Go back home
                </a>
              </div>
            </div>
          );
        },
      },
    ],
  },
]);
