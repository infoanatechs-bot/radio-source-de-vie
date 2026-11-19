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
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', color: '#0B1F4B', fontSize: '36px', marginBottom: '30px' }}>
        Programmes de la semaine
      </h1>

      {chargement ? <p>Chargement...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {programmes.map((prog) => (
            <div key={prog.id} style={{ 
              display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '12px', 
              overflow: 'hidden', boxShadow: '0 2px 10px rgba(11,31,75,0.05)' 
            }}>
              {/* LA CASE BLEUE EST BIEN LÀ */}
              <div style={{ 
                backgroundColor: '#0B1F4B', color: '#C9A227', padding: '20px', width: '150px', 
                textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' 
              }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{prog.day_of_week}</span>
                <span style={{ fontSize: '13px', color: '#F5F6F8', marginTop: '5px' }}>
                  {prog.start_time?.substring(0, 5)} - {prog.end_time?.substring(0, 5)}
                </span>
              </div>

              {/* LE LISERÉ DORÉ EST BIEN LÀ */}
              <div style={{ padding: '20px', flex: 1, borderLeft: '4px solid #C9A227' }}>
                <span style={{ backgroundColor: '#F5F6F8', color: '#3A4256', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {prog.type}
                </span>
                <h3 style={{ margin: '10px 0 5px 0', color: '#0B1F4B', fontSize: '20px' }}>{prog.title}</h3>
                <p style={{ margin: 0, color: '#3A4256', fontSize: '14px' }}>Animé par {prog.animator}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}