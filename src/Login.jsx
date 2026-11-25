import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

function estRetourDeRecuperation() {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hash.includes('type=recovery') ||
    window.location.search.includes('code=')
  );
}

function IconeOeil({ barre }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {barre ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export default function Login() {
  const [mode, setMode] = useState(
    estRetourDeRecuperation() ? 'nouveau' : 'connexion'
  );
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [afficher, setAfficher] = useState(false);
  const [erreur, setErreur] = useState('');
  const [info, setInfo] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: ecouteur } = supabase.auth.onAuthStateChange((evenement) => {
      if (evenement === 'PASSWORD_RECOVERY') setMode('nouveau');
    });

    if (!estRetourDeRecuperation()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) navigate('/admin');
      });
    }

    return () => ecouteur.subscription.unsubscribe();
  }, [navigate]);

  const changerMode = (nouveauMode) => {
    setMode(nouveauMode);
    setErreur('');
    setInfo('');
    setAfficher(false);
  };

  const seConnecter = async (e) => {
    e.preventDefault();
    setErreur('');
    setEnvoiEnCours(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: motDePasse,
    });

    setEnvoiEnCours(false);

    if (error) {
      setErreur('Identifiant ou mot de passe incorrect.');
      return;
    }
    navigate('/admin');
  };

  const envoyerLien = async (e) => {
    e.preventDefault();
    setErreur('');
    setInfo('');
    setEnvoiEnCours(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/login`,
    });

    setEnvoiEnCours(false);

    if (error) {
      setErreur(
        'Impossible d\u2019envoyer l\u2019e-mail pour le moment. Réessayez dans quelques minutes.'
      );
      return;
    }
    setInfo(
      'Si un compte existe pour cette adresse, un e-mail avec un lien de réinitialisation vient d\u2019être envoyé.'
    );
  };

  const enregistrerNouveauMotDePasse = async (e) => {
    e.preventDefault();
    setErreur('');
    setInfo('');

    if (nouveauMotDePasse.length < 8) {
      setErreur('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (nouveauMotDePasse !== confirmation) {
      setErreur('Les deux mots de passe ne sont pas identiques.');
      return;
    }

    setEnvoiEnCours(true);
    const { error } = await supabase.auth.updateUser({
      password: nouveauMotDePasse,
    });
    setEnvoiEnCours(false);

    if (error) {
      setErreur(
        'Le lien a expiré ou n\u2019est plus valide. Demandez un nouveau lien.'
      );
      return;
    }

    setInfo('Mot de passe modifié. Redirection en cours...');
    setTimeout(() => navigate('/admin'), 1500);
  };

  const titres = {
    connexion: {
      titre: 'Espace administrateur',
      sous: 'Connectez-vous pour gérer la radio.',
    },
    oubli: {
      titre: 'Mot de passe oublié',
      sous: 'Entrez votre e-mail, nous vous envoyons un lien de réinitialisation.',
    },
    nouveau: {
      titre: 'Nouveau mot de passe',
      sous: 'Choisissez un nouveau mot de passe d\u2019au moins 8 caractères.',
    },
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 150px);
          background: white;
        }
        .login-visuel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          color: white;
          background:
            linear-gradient(160deg, rgba(11,31,75,0.80) 0%, rgba(11,31,75,0.93) 100%),
            url('/studio.jpg') center / cover no-repeat,
            #0B1F4B;
        }
        .login-deco {
          position: absolute;
          right: -40px;
          top: 40px;
          width: 340px;
          height: 340px;
          color: #C9A227;
          opacity: 0.12;
          pointer-events: none;
        }
        .login-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 8px 16px;
          border: 1px solid rgba(201,162,39,0.6);
          border-radius: 30px;
          color: #C9A227;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .login-point {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C9A227;
        }
        .login-texte-visuel { position: relative; max-width: 480px; }
        .login-trait {
          width: 60px;
          height: 4px;
          background: #C9A227;
          border-radius: 2px;
          margin-bottom: 24px;
        }
        .login-formulaire {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 24px;
          background: white;
        }
        .login-boite { width: 100%; max-width: 400px; }
        .login-label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          color: #0B1F4B;
          margin-bottom: 6px;
        }
        .login-champ {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #d5d8de;
          border-radius: 10px;
          font-size: 16px;
          color: #0B1F4B;
          background: #fbfbfc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-champ:focus {
          outline: none;
          border-color: #C9A227;
          box-shadow: 0 0 0 4px rgba(201,162,39,0.18);
          background: white;
        }
        .login-oeil {
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 8px;
          display: flex;
        }
        .login-oeil:hover { color: #0B1F4B; }
        .login-bouton {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #0B1F4B;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .login-bouton:hover { background: #142A5C; }
        .login-bouton:active { transform: scale(0.99); }
        .login-bouton:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-lien {
          background: none;
          border: none;
          padding: 0;
          color: #A8861C;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
        }
        .login-lien:hover { text-decoration: underline; }
        @media (max-width: 900px) {
          .login-page { grid-template-columns: 1fr; }
          .login-visuel { display: none; }
          .login-formulaire { padding: 40px 20px; }
        }
      `}</style>

      {/* PARTIE GAUCHE : image + texte */}
      <div className="login-visuel">
        <svg
          className="login-deco"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>

        <div className="login-badge">
          <span className="login-point"></span>
          RADIO EN LIGNE
        </div>

        <div className="login-texte-visuel">
          <div className="login-trait"></div>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '40px',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
            }}
          >
            La voix qui nourrit votre foi.
          </h2>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.6,
              margin: 0,
              color: '#F5F6F8',
              opacity: 0.88,
            }}
          >
            Bienvenue dans l'espace de l'équipe Source de Vie. Gérez vos
            programmes, vos prédications et votre direct, pour porter la Parole
            là où elle est attendue.
          </p>
        </div>
      </div>

      {/* PARTIE DROITE : formulaire */}
      <div className="login-formulaire">
        <div className="login-boite">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '32px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              style={{ height: '38px', width: '38px' }}
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
          </div>

          <h1
            style={{
              fontFamily: 'Georgia, serif',
              color: '#0B1F4B',
              fontSize: '30px',
              margin: '0 0 8px 0',
            }}
          >
            {titres[mode].titre}
          </h1>
          <p style={{ color: '#3A4256', margin: '0 0 28px 0', lineHeight: 1.5 }}>
            {titres[mode].sous}
          </p>

          {erreur && (
            <div
              role="alert"
              style={{
                padding: '12px 14px',
                marginBottom: '18px',
                borderRadius: '10px',
                backgroundColor: '#ffebee',
                color: '#B3261E',
                fontSize: '14px',
              }}
            >
              {erreur}
            </div>
          )}
          {info && (
            <div
              role="status"
              style={{
                padding: '12px 14px',
                marginBottom: '18px',
                borderRadius: '10px',
                backgroundColor: '#e8f5e9',
                color: '#1E7A4D',
                fontSize: '14px',
              }}
            >
              {info}
            </div>
          )}

          {/* MODE : CONNEXION */}
          {mode === 'connexion' && (
            <form
              onSubmit={seConnecter}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              <div>
                <label className="login-label" htmlFor="email">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  className="login-champ"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="login-label" htmlFor="mdp">
                  Mot de passe
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="mdp"
                    className="login-champ"
                    style={{ paddingRight: '48px' }}
                    required
                    type={afficher ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                  <button
                    type="button"
                    className="login-oeil"
                    onClick={() => setAfficher(!afficher)}
                    aria-label={
                      afficher
                        ? 'Masquer le mot de passe'
                        : 'Afficher le mot de passe'
                    }
                  >
                    <IconeOeil barre={afficher} />
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '-6px' }}>
                <button
                  type="button"
                  className="login-lien"
                  onClick={() => changerMode('oubli')}
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                type="submit"
                className="login-bouton"
                disabled={envoiEnCours}
              >
                {envoiEnCours ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          )}

          {/* MODE : MOT DE PASSE OUBLIÉ */}
          {mode === 'oubli' && (
            <form
              onSubmit={envoyerLien}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              <div>
                <label className="login-label" htmlFor="email-oubli">
                  Adresse e-mail
                </label>
                <input
                  id="email-oubli"
                  className="login-champ"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="login-bouton"
                disabled={envoiEnCours}
              >
                {envoiEnCours ? 'Envoi...' : 'Envoyer le lien'}
              </button>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  className="login-lien"
                  onClick={() => changerMode('connexion')}
                >
                  ← Retour à la connexion
                </button>
              </div>
            </form>
          )}

          {/* MODE : NOUVEAU MOT DE PASSE */}
          {mode === 'nouveau' && (
            <form
              onSubmit={enregistrerNouveauMotDePasse}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              <div>
                <label className="login-label" htmlFor="nouveau-mdp">
                  Nouveau mot de passe
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="nouveau-mdp"
                    className="login-champ"
                    style={{ paddingRight: '48px' }}
                    required
                    type={afficher ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={nouveauMotDePasse}
                    onChange={(e) => setNouveauMotDePasse(e.target.value)}
                  />
                  <button
                    type="button"
                    className="login-oeil"
                    onClick={() => setAfficher(!afficher)}
                    aria-label={
                      afficher
                        ? 'Masquer le mot de passe'
                        : 'Afficher le mot de passe'
                    }
                  >
                    <IconeOeil barre={afficher} />
                  </button>
                </div>
              </div>
              <div>
                <label className="login-label" htmlFor="confirmation">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmation"
                  className="login-champ"
                  required
                  type={afficher ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="login-bouton"
                disabled={envoiEnCours}
              >
                {envoiEnCours ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
              </button>
            </form>
          )}

          <p style={{ textAlign: 'center', margin: '26px 0 0 0' }}>
            <Link
              to="/"
              style={{
                color: '#3A4256',
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              ← Retour au site
            </Link>
          </p>

          <div
            style={{
              marginTop: '34px',
              paddingTop: '22px',
              borderTop: '1px solid #ececf0',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                color: '#A8861C',
                fontSize: '17px',
              }}
            >
              L'Évangile dans vos maisons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}