import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import LiveNow from './LiveNow';
import Programs from './Programs';
import Predications from './Predications';
import Calendrier from './Calendrier';
import APropos from './APropos';
import Contact from './Contact';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import AdminPredications from './AdminPredications';

function Accueil() {
  return (
    <>
      <Hero />
      <LiveNow />
      <Programs />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      {/* Le fond gris clair (#F5F6F8) est appliqué à TOUT le site ici */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F6F8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Header />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/programmes" element={<Calendrier />} />
            <Route path="/predications" element={<Predications />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/predications" element={<AdminPredications />} />
          </Routes>
        </main>
        
        <footer style={{ backgroundColor: '#0B1F4B', color: 'white', textAlign: 'center', padding: '30px' }}>
          <p style={{ margin: 0 }}>© 2026 SOURCE DE VIE - La voix qui nourrit votre foi.</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;