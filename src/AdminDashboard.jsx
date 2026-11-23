import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Si ta page de gestion des prédications a une autre adresse dans App.jsx,
// change seulement cette ligne.
const LIEN_PREDICATIONS = '/admin/predications';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [chargement, setChargement] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setSession(session);
      }
      setChargement(false);
    });
  }, [navigate]);

  const deconnexion = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (chargement) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Vérification de la sécurité...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const carteStyle = {
    display: 'block',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(11,31,75,0.06)',
    borderLeft: '5px solid #C9A227',
    textDecoration: 'none',
    color: '#0B1F4B',
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F6F8',
        minHeight: '100vh',
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '30px',
          }}
        >
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              color: '#0B1F4B',
              fontSize: '32px',
              margin: 0,
            }}
          >
            Tableau de bord
          </h1>
          <button
            onClick={deconnexion}
            style={{
              backgroundColor: '#e0e0e0',
              color: '#0B1F4B',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Se déconnecter
          </button>
        </div>

        <p style={{ color: '#3A4256', marginTop: 0, marginBottom: '30px' }}>
          Connecté en tant que {session.user.email}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          <Link to={LIEN_PREDICATIONS} style={carteStyle}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
              Gérer les prédications
            </h2>
            <p style={{ margin: 0, color: '#3A4256', fontSize: '14px' }}>
              Ajouter ou consulter les audios enregistrés.
            </p>
          </Link>

          <a
            href="https://cloud.caster.fm"
            target="_blank"
            rel="noreferrer"
            style={carteStyle}
          >
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
              Console Caster.fm
            </h2>
            <p style={{ margin: 0, color: '#3A4256', fontSize: '14px' }}>
              Gérer le direct et voir les auditeurs.
            </p>
          </a>

          <Link to="/" style={carteStyle}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
              Voir le site
            </h2>
            <p style={{ margin: 0, color: '#3A4256', fontSize: '14px' }}>
              Retourner à la page d'accueil.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}