import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './components/auth/AuthProvider';
import { AuthGuard } from './components/auth/AuthGuard';
import { AppShell } from './layouts/AppShell';
import { ErrorBoundary } from './components/states/ErrorBoundary';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { NewSessionPage } from './pages/NewSessionPage';
import { PracticeSessionPage } from './pages/PracticeSessionPage';
import { SessionReportPage } from './pages/SessionReportPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { WhatsAppComingSoonPage } from './pages/WhatsAppComingSoonPage';
import { NotFoundPage } from './pages/NotFoundPage';

// No legacy standalone pages imported

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes without AppShell */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Routes wrapped in AppShell */}
            <Route element={<AppShell />}>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Protected */}
              <Route element={<AuthGuard />}>
                <Route path="/session/new" element={<NewSessionPage />} />
                <Route path="/session/:sessionId" element={<PracticeSessionPage />} />
                <Route path="/session/:sessionId/report" element={<SessionReportPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/whatsapp" element={<WhatsAppComingSoonPage />} />
                
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}