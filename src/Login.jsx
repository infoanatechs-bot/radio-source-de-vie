import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const gererConnexion = async (e) => {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    // On demande à Supabase de vérifier l'email et le mot de passe
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErreur('Email ou mot de passe incorrect.');
      setChargement(false);
    } else {
      // Si c'est bon, on redirige vers la page d'administration (qu'on créera juste après)
      navigate('/admin');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        backgroundColor: '#F5F6F8',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '18px',
          boxShadow: '0 8px 24px rgba(11,31,75,0.10)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#0B1F4B',
            fontFamily: 'Georgia, serif',
            marginBottom: '30px',
          }}
        >
          Espace Administrateur
        </h2>

        {erreur && (
          <div
            style={{
              backgroundColor: '#ffebee',
              color: '#B3261E',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {erreur}
          </div>
        )}

        <form
          onSubmit={gererConnexion}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#3A4256',
                fontWeight: 'bold',
              }}
            >
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#3A4256',
                fontWeight: 'bold',
              }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={chargement}
            style={{
              backgroundColor: '#0B1F4B',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: chargement ? 'not-allowed' : 'pointer',
              opacity: chargement ? 0.7 : 1,
              marginTop: '10px',
            }}
          >
            {chargement ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
