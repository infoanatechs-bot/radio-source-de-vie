import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Predications() {
  const [predications, setPredications] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function charger() {
      const { data } = await supabase.from('sermons').select('*').eq('published', true);
      if (data) setPredications(data);
      setChargement(false);
    }
    charger();
  }, []);

  const predicationsFiltrees = predications.filter(pred => 
    pred.title.toLowerCase().includes(recherche.toLowerCase()) || 
    pred.preacher.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
      {/* BANNIÈRE BLEUE */}
      <div style={{ backgroundColor: '#0B1F4B', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', color: '#C9A227', fontSize: '36px', margin: 0 }}>
          Prédications & Enseignements
        </h1>
        <p style={{ color: '#F5F6F8', marginTop: '10px', fontSize: '16px' }}>
          Réécoutez les messages qui vous ont marqués.
        </p>
      </div>

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Barre de recherche */}
        <input 
          type="text" 
          placeholder="Rechercher un titre ou un prédicateur..." 
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid #ccc', fontSize: '16px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
        />

        {chargement ? <p>Chargement...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {predicationsFiltrees.map(pred => (
              <div key={pred.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(11,31,75,0.06)', borderLeft: '5px solid #0B1F4B' }}>
                <span style={{ color: '#C9A227', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{pred.category}</span>
                <h3 style={{ margin: '8px 0', color: '#0B1F4B', fontSize: '22px' }}>{pred.title}</h3>
                <p style={{ margin: 0, color: '#3A4256', fontSize: '15px', marginBottom: '15px' }}>{pred.preacher}</p>
                
                {pred.audio_url && (
                  <audio controls src={pred.audio_url} style={{ width: '100%', height: '40px' }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}