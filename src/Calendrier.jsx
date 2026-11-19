import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Calendrier() {
  const [programmes, setProgrammes] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function charger() {
      const { data } = await supabase.from('programs').select('*').order('id', { ascending: true });
      if (data) setProgrammes(data);
      setChargement(false);
    }
    charger();
  }, []);

  return (
    <div style={{ backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
      {/* BANNIÈRE BLEUE */}
      <div style={{ backgroundColor: '#0B1F4B', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', color: '#C9A227', fontSize: '36px', margin: 0 }}>
          Programmes de la semaine
        </h1>
        <p style={{ color: '#F5F6F8', marginTop: '10px', fontSize: '16px' }}>
          Retrouvez tous nos rendez-vous et temps de communion.
        </p>
      </div>

      <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        {chargement ? <p>Chargement...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {programmes.map((prog) => (
              <div key={prog.id} style={{ 
                display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '16px', 
                overflow: 'hidden', boxShadow: '0 4px 15px rgba(11,31,75,0.06)',
                borderTop: '5px solid #C9A227'
              }}>
                <div style={{ padding: '25px' }}>
                  <span style={{ backgroundColor: '#0B1F4B', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {prog.type}
                  </span>
                  <h3 style={{ margin: '15px 0 5px 0', color: '#0B1F4B', fontSize: '22px' }}>{prog.title}</h3>
                  <p style={{ margin: 0, color: '#3A4256', fontSize: '14px', fontWeight: 'bold' }}>{prog.day_of_week}</p>
                </div>
                
                <div style={{ backgroundColor: '#F5F6F8', padding: '15px 25px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#0B1F4B', fontWeight: 'bold' }}>{prog.start_time?.substring(0, 5)} - {prog.end_time?.substring(0, 5)}</span>
                  <span style={{ color: '#3A4256', fontSize: '14px' }}>{prog.animator}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}