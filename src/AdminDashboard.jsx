import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const LIEN_PREDICATIONS = '/admin/predications';
const LIEN_PROGRAMMES = '/admin/programmes';

function Icone({ children }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Carte({ to, externe, icone, titre, texte }) {
  const contenu = (
    <>
      <div className="admin-icone">{icone}</div>
      <h3 className="admin-carte-titre">{titre}</h3>
      <p className="admin-carte-texte">{texte}</p>
      <span className="admin-carte-lien">Ouvrir →</span>
    </>
  );

  if (externe) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        className="admin-carte"
      >
        {contenu}
      </a>
    );
  }
  return (
    <Link to={to} className="admin-carte">
      {contenu}
    </Link>
  );
}

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [nbProgrammes, setNbProgrammes] = useState(null);
  const [nbPredications, setNbPredications] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setSession(session);
        Promise.all([
          supabase
            .from('programs')
            .select('*', { count: 'exact', head: true }),
          supabase
            .from('sermons')
            .select('*', { count: 'exact', head: true }),
        ]).then(([programmes, predications]) => {
          setNbProgrammes(programmes.error ? null : programmes.count);
          setNbPredications(predications.error ? null : predications.count);
        });
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

  const dateDuJour = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="admin-page">
      <style>{`
        .admin-page {
          background: #F5F6F8;
          min-height: calc(100vh - 150px);
          padding: 40px 20px 60px;
        }
        .admin-contenu { max-width: 1000px; margin: 0 auto; }
        .admin-banniere {
          background: linear-gradient(135deg, #0B1F4B 0%, #142A5C 100%);
          border-radius: 20px;
          border-bottom: 4px solid #C9A227;
          padding: 34px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
          color: white;
          box-shadow: 0 10px 30px rgba(11,31,75,0.18);
        }
        .admin-etiquette {
          display: inline-block;
          color: #C9A227;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .admin-deconnexion {
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.45);
          padding: 10px 18px;
          border-radius: 30px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .admin-deconnexion:hover {
          background: rgba(255,255,255,0.12);
          border-color: #C9A227;
        }
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin: 24px 0 36px;
        }
        .admin-stat {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 4px 15px rgba(11,31,75,0.06);
        }
        .admin-stat-nombre {
          font-family: Georgia, serif;
          font-size: 36px;
          font-weight: bold;
          color: #0B1F4B;
          line-height: 1;
        }
        .admin-stat-nom {
          margin-top: 8px;
          color: #3A4256;
          font-size: 14px;
        }
        .admin-section-titre {
          font-family: Georgia, serif;
          color: #0B1F4B;
          font-size: 22px;
          margin: 0 0 16px 0;
        }
        .admin-grille {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 18px;
        }
        .admin-carte {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 18px;
          padding: 26px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(11,31,75,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .admin-carte:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(11,31,75,0.14);
        }
        .admin-icone {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #0B1F4B;
          color: #C9A227;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }
        .admin-carte-titre {
          margin: 0 0 6px 0;
          color: #0B1F4B;
          font-size: 18px;
        }
        .admin-carte-texte {
          margin: 0 0 18px 0;
          color: #3A4256;
          font-size: 14px;
          line-height: 1.5;
          flex: 1;
        }
        .admin-carte-lien {
          color: #A8861C;
          font-weight: bold;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .admin-banniere { padding: 24px; }
        }
      `}</style>

      <div className="admin-contenu">
        {/* Bannière */}
        <div className="admin-banniere">
          <div>
            <span className="admin-etiquette">ESPACE ADMINISTRATEUR</span>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '34px',
                margin: '0 0 8px 0',
              }}
            >
              Tableau de bord
            </h1>
            <p
              style={{
                margin: 0,
                opacity: 0.85,
                textTransform: 'capitalize',
                fontSize: '15px',
              }}
            >
              {dateDuJour}
            </p>
            <p style={{ margin: '6px 0 0 0', opacity: 0.7, fontSize: '14px' }}>
              Connecté en tant que {session.user.email}
            </p>
          </div>
          <button className="admin-deconnexion" onClick={deconnexion}>
            Se déconnecter
          </button>
        </div>

        {/* Compteurs */}
        <div className="admin-stats">
          <div className="admin-stat">
            <div className="admin-stat-nombre">
              {nbProgrammes === null ? '—' : nbProgrammes}
            </div>
            <div className="admin-stat-nom">Programmes enregistrés</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-nombre">
              {nbPredications === null ? '—' : nbPredications}
            </div>
            <div className="admin-stat-nom">Prédications en ligne</div>
          </div>
        </div>

        {/* Actions */}
        <h2 className="admin-section-titre">Gérer la radio</h2>
        <div className="admin-grille">
          <Carte
            to={LIEN_PROGRAMMES}
            titre="Programmes"
            texte="Créer et organiser les émissions de la semaine."
            icone={
              <Icone>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </Icone>
            }
          />
          <Carte
            to={LIEN_PREDICATIONS}
            titre="Prédications"
            texte="Ajouter des audios et consulter les messages enregistrés."
            icone={
              <Icone>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </Icone>
            }
          />
          <Carte
            to="https://cloud.caster.fm"
            externe
            titre="Console Caster.fm"
            texte="Gérer le direct et voir les auditeurs en temps réel."
            icone={
              <Icone>
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
              </Icone>
            }
          />
          <Carte
            to="/"
            titre="Voir le site"
            texte="Retourner à la page d'accueil, comme un auditeur."
            icone={
              <Icone>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </Icone>
            }
          />
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '44px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: '#A8861C',
            fontSize: '16px',
          }}
        >
          L'Évangile dans vos maisons
        </p>
      </div>
    </div>
  );
}