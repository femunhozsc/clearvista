import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import StockPage from '@/pages/StockPage';
import AuthPage from '@/pages/AuthPage';
import NoticiasPage from '@/pages/NoticiasPage';
import CarteiraPage from '@/pages/CarteiraPage';
import ComparadorPage from '@/pages/ComparadorPage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ativo/:ticker" element={<StockPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route 
            path="/carteira" 
            element={
              <ProtectedRoute>
                <CarteiraPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/ferramentas/comparador" element={<ComparadorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;