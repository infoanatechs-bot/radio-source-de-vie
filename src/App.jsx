import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Importation de toutes nos pages et composants
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
import AdminPredications from './AdminPredications'; // <-- C'est cet import qui manquait !

// Le composant pour la page d'accueil qui assemble plusieurs sections
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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F5F6F8',
        }}
      >
        {/* Le menu de navigation en haut */}
        <Header />

        {/* La zone de contenu qui change selon l'URL */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<Accueil />} />
            <Route path="/programmes" element={<Calendrier />} />
            <Route path="/predications" element={<Predications />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            {/* Pages d'administration */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/admin/predications"
              element={<AdminPredications />}
            />{' '}
            {/* <-- C'est cette route qui manquait ! */}
          </Routes>
        </main>

        {/* Le pied de page */}
        <footer
          style={{
            backgroundColor: '#0B1F4B',
            color: 'white',
            textAlign: 'center',
            padding: '30px',
            marginTop: 'auto',
          }}
        >
          <p style={{ margin: 0 }}>
            © 2026 SOURCE DE VIE - La voix qui nourrit votre foi.
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
