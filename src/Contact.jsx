import React, { useState } from 'react';

export default function Contact() {
  const [formulaire, setFormulaire] = useState({
    nom: '',
    email: '',
    message: '',
  });
  const [envoye, setEnvoye] = useState(false);

  const gererEnvoi = (e) => {
    e.preventDefault();
    // Ici, on simule l'envoi du message (plus tard, on le connectera à un vrai service)
    setTimeout(() => {
      setEnvoye(true);
      setFormulaire({ nom: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'Georgia, serif',
          color: '#0B1F4B',
          fontSize: '36px',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        Contactez-nous
      </h1>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Coordonnées */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div
            style={{
              backgroundColor: '#0B1F4B',
              padding: '30px',
              borderRadius: '18px',
              color: 'white',
            }}
          >
            <h3 style={{ color: '#C9A227', marginTop: 0 }}>Nos Coordonnées</h3>
            <p>
              📍 Adresse de l'église
              <br />
              (À remplacer)
            </p>
            <p>📞 +228 XX XX XX XX</p>
            <p>✉️ contact@sourcedevie.com</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <span
                style={{
                  backgroundColor: '#C9A227',
                  color: '#0B1F4B',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Facebook
              </span>
              <span
                style={{
                  backgroundColor: '#C9A227',
                  color: '#0B1F4B',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                YouTube
              </span>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div
          style={{
            flex: 2,
            minWidth: '300px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '18px',
            boxShadow: '0 4px 20px rgba(11,31,75,0.08)',
          }}
        >
          {envoye ? (
            <div
              style={{ textAlign: 'center', color: '#1E7A4D', padding: '20px' }}
            >
              <h3>Merci !</h3>
              <p>
                Votre message a bien été envoyé. Nous vous répondrons dès que
                possible.
              </p>
              <button
                onClick={() => setEnvoye(false)}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#0B1F4B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={gererEnvoi}
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    color: '#0B1F4B',
                    fontWeight: 'bold',
                  }}
                >
                  Nom complet
                </label>
                <input
                  required
                  type="text"
                  value={formulaire.nom}
                  onChange={(e) =>
                    setFormulaire({ ...formulaire, nom: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
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
                    color: '#0B1F4B',
                    fontWeight: 'bold',
                  }}
                >
                  Adresse Email
                </label>
                <input
                  required
                  type="email"
                  value={formulaire.email}
                  onChange={(e) =>
                    setFormulaire({ ...formulaire, email: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
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
                    color: '#0B1F4B',
                    fontWeight: 'bold',
                  }}
                >
                  Votre message
                </label>
                <textarea
                  required
                  rows="4"
                  value={formulaire.message}
                  onChange={(e) =>
                    setFormulaire({ ...formulaire, message: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                ></textarea>
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#C9A227',
                  color: '#0B1F4B',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
