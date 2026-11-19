import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Predications() {
  const [predications, setPredications] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [categorieActive, setCategorieActive] = useState('Toutes');
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function chargerPredications() {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .eq('published', true);
      if (!error) setPredications(data || []);
      setChargement(false);
    }
    chargerPredications();
  }, []);

  const predicationsFiltrees = predications.filter((pred) => {
    const correspondRecherche =
      pred.title.toLowerCase().includes(recherche.toLowerCase()) ||
      pred.preacher.toLowerCase().includes(recherche.toLowerCase());
    const correspondCategorie =
      categorieActive === 'Toutes' || pred.category === categorieActive;
    return correspondRecherche && correspondCategorie;
  });

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'Georgia, serif',
          color: '#0B1F4B',
          fontSize: '36px',
          marginBottom: '30px',
        }}
      >
        Prédications & Enseignements
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un titre ou un prédicateur..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            minWidth: '250px',
          }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          {['Toutes', 'Prédication', 'Enseignement', 'Louange'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorieActive(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor:
                  categorieActive === cat ? '#0B1F4B' : '#F5F6F8',
                color: categorieActive === cat ? 'white' : '#3A4256',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {chargement ? (
        <p>Chargement des prédications...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {predicationsFiltrees.length === 0 ? (
            <p style={{ color: '#3A4256' }}>Aucune prédication trouvée.</p>
          ) : (
            predicationsFiltrees.map((pred) => (
              <div
                key={pred.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(11,31,75,0.05)',
                  borderLeft: '4px solid #0B1F4B',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: '#C9A227',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}
                    >
                      {pred.category}
                    </span>
                    <h3
                      style={{
                        margin: '5px 0',
                        color: '#0B1F4B',
                        fontSize: '20px',
                      }}
                    >
                      {pred.title}
                    </h3>
                    <p
                      style={{ margin: 0, color: '#3A4256', fontSize: '14px' }}
                    >
                      {pred.preacher}
                    </p>
                  </div>
                </div>

                {/* LECTEUR AUDIO AJOUTÉ ICI */}
                {pred.audio_url && (
                  <audio
                    controls
                    src={pred.audio_url}
                    style={{ width: '100%', marginTop: '15px', height: '40px' }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
