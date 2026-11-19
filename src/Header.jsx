import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => authListener.subscription.unsubscribe();
  }, []);

  const fermerMenu = () => setMenuOuvert(false);
  const gererClicAdmin = () => {
    fermerMenu();
    navigate(session ? '/admin' : '/login');
  };

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '15px 20px', 
      backgroundColor: '#0B1F4B', // FOND BLEU NUIT
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: '15px'
    }}>
      <Link to="/" onClick={fermerMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={{ height: '40px', width: '40px' }}>
          <path d="M32 5 C32 5 14 25 14 39 C14 49 22 57 32 57 C42 57 50 49 50 39 C50 25 32 5 32 5 Z" fill="#FFFFFF"/>
          <path d="M18 48 Q32 58 46 48" fill="none" stroke="#C9A227" strokeWidth="4" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '20px' }}>
          <span style={{ color: '#FFFFFF' }}>SOURCE DE </span>
          <span style={{ color: '#C9A227' }}>VIE</span>
        </span>
      </Link>

      <button onClick={() => setMenuOuvert(!menuOuvert)} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', fontSize: '24px', color: 'white', cursor: 'pointer' }}>☰</button>

      <nav className={`nav-menu ${menuOuvert ? 'ouvert' : ''}`} style={{ display: 'flex', gap: '25px', alignItems: 'center', fontWeight: '500', fontSize: '15px' }}>
        <Link to="/" onClick={fermerMenu} style={{ textDecoration: 'none', color: '#F5F6F8', opacity: 0.9 }}>Accueil</Link>
        <Link to="/programmes" onClick={fermerMenu} style={{ textDecoration: 'none', color: '#F5F6F8', opacity: 0.9 }}>Programmes</Link>
        <Link to="/predications" onClick={fermerMenu} style={{ textDecoration: 'none', color: '#F5F6F8', opacity: 0.9 }}>Prédications</Link>
        <Link to="/a-propos" onClick={fermerMenu} style={{ textDecoration: 'none', color: '#F5F6F8', opacity: 0.9 }}>À propos</Link>
        <Link to="/contact" onClick={fermerMenu} style={{ textDecoration: 'none', color: '#F5F6F8', opacity: 0.9 }}>Contact</Link>
        
        <button onClick={gererClicAdmin} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', color: '#C9A227' }}>
          {session ? "Tableau de bord" : "Connexion"}
        </button>

        <button style={{ backgroundColor: '#C9A227', color: '#0B1F4B', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#B3261E', borderRadius: '50%' }}></span>
          ÉCOUTER EN DIRECT
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .nav-menu { display: none !important; width: 100%; flex-direction: column; align-items: flex-start !important; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); }
          .nav-menu.ouvert { display: flex !important; }
        }
      `}</style>
    </header>
  );
}