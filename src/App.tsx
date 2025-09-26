import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Loader2 } from 'lucide-react';

// Lazy load pages for better performance
const MedChat = React.lazy(() => import('./pages/MedChat'));
const CliniView = React.lazy(() => import('./pages/CliniView'));
const Assistentes = React.lazy(() => import('./pages/Assistentes'));
const Conhecimento = React.lazy(() => import('./pages/Conhecimento'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MedChat />} />
            <Route path="/cliniview" element={<CliniView />} />
            <Route path="/assistentes" element={<Assistentes />} />
            <Route path="/conhecimento" element={<Conhecimento />} />
            <Route path="/search" element={<div className="p-8 text-center text-muted-foreground">Página em desenvolvimento</div>} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
