import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  const fermerMenu = () => setMenuOuvert(false);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '15px',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={fermerMenu}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          style={{ height: '40px', width: '40px' }}
        >
          <path
            d="M32 5 C32 5 14 25 14 39 C14 49 22 57 32 57 C42 57 50 49 50 39 C50 25 32 5 32 5 Z"
            fill="#0B1F4B"
          />
          <path
            d="M18 48 Q32 58 46 48"
            fill="none"
            stroke="#C9A227"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          <span style={{ color: '#0B1F4B' }}>SOURCE DE </span>
          <span style={{ color: '#C9A227' }}>VIE</span>
        </span>
      </Link>

      {/* Bouton Menu Mobile (visible uniquement sur petit écran) */}
      <button
        onClick={() => setMenuOuvert(!menuOuvert)}
        style={{
          display: 'block', // On gère le responsive avec du CSS injecté plus bas
          background: 'none',
          border: 'none',
          fontSize: '24px',
          color: '#0B1F4B',
          cursor: 'pointer',
          padding: '5px',
        }}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* Navigation (Desktop et Mobile) */}
      <nav
        className={`nav-menu ${menuOuvert ? 'ouvert' : ''}`}
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          fontWeight: '500',
          color: '#0B1F4B',
          fontSize: '15px',
        }}
      >
        <Link
          to="/"
          onClick={fermerMenu}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Accueil
        </Link>
        <Link
          to="/programmes"
          onClick={fermerMenu}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Programmes
        </Link>
        <Link
          to="/predications"
          onClick={fermerMenu}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Prédications
        </Link>
        <Link
          to="/a-propos"
          onClick={fermerMenu}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          À propos
        </Link>
        <Link
          to="/contact"
          onClick={fermerMenu}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Contact
        </Link>

        <button
          style={{
            backgroundColor: '#C9A227',
            color: '#0B1F4B',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            marginTop: '10px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              backgroundColor: '#B3261E',
              borderRadius: '50%',
            }}
          ></span>
          ÉCOUTER EN DIRECT
        </button>
      </nav>

      {/* Ajout de style CSS pour gérer l'affichage mobile */}
      <style>{`
        .mobile-menu-btn { display: none !important; }
        
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          
          .nav-menu {
            display: none !important;
            width: 100%;
            flex-direction: column;
            align-items: flex-start !important;
            padding-top: 15px;
            border-top: 1px solid #eee;
          }
          
          .nav-menu.ouvert {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
