import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { NewLandingPage } from './components/NewLandingPage';
import { GeneratorPageFinal } from './components/GeneratorPageFinal';
import { WhatsAppPageFinal } from './components/WhatsAppPageFinal';
import { PracticePage } from './components/PracticePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/generate" element={<GeneratorPageFinal />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/whatsapp" element={<WhatsAppPageFinal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}