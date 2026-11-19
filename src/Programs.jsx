import React from 'react';

export default function Programs() {
  // Données d'exemple (Elles seront remplacées par la base de données plus tard)
  const programmes = [
    {
      jour: 'Dimanche',
      heure: '09:00',
      titre: 'Culte Dominical',
      animateur: 'Pasteur Jean Dupont',
    },
    {
      jour: 'Mercredi',
      heure: '18:00',
      titre: 'Étude Biblique',
      animateur: 'Frère Paul',
    },
    {
      jour: 'Vendredi',
      heure: '20:00',
      titre: 'Soirée de Prière',
      animateur: 'Sœur Marie',
    },
  ];

  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#F5F6F8' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            color: '#0B1F4B',
            fontSize: '28px',
            marginBottom: '30px',
          }}
        >
          Prochains programmes
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {programmes.map((prog, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(11,31,75,0.05)',
                borderLeft: '4px solid #C9A227',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: '#A8861C',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {prog.jour}
                </span>
                <span style={{ color: '#3A4256', fontWeight: 'bold' }}>
                  {prog.heure}
                </span>
              </div>
              <h3
                style={{
                  margin: '0 0 5px 0',
                  color: '#0B1F4B',
                  fontSize: '18px',
                }}
              >
                {prog.titre}
              </h3>
              <p style={{ margin: 0, color: '#3A4256', fontSize: '14px' }}>
                {prog.animateur}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
