import React from 'react';

export default function APropos() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'Georgia, serif',
          color: '#0B1F4B',
          fontSize: '36px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        À propos de SOURCE DE VIE
      </h1>

      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '18px',
          boxShadow: '0 4px 20px rgba(11,31,75,0.08)',
          lineHeight: '1.8',
          color: '#3A4256',
        }}
      >
        <h2
          style={{
            color: '#0B1F4B',
            fontFamily: 'Georgia, serif',
            marginTop: 0,
          }}
        >
          Notre Vision
        </h2>
        <p>
          SOURCE DE VIE est née d'un désir profond : rendre la Parole de Dieu
          accessible à tous, partout dans le monde, à toute heure du jour ou de
          la nuit. Nous croyons que la foi se nourrit par l'écoute et
          l'enseignement.
        </p>

        <h2
          style={{
            color: '#0B1F4B',
            fontFamily: 'Georgia, serif',
            marginTop: '30px',
          }}
        >
          Notre Mission
        </h2>
        <p>
          Diffuser des cultes en direct, des prédications inspirantes, des
          moments de prière et des louanges de qualité. Nous voulons être une
          source d'eau vive pour quiconque cherche la paix, l'espérance et la
          vérité.
        </p>

        <h2
          style={{
            color: '#0B1F4B',
            fontFamily: 'Georgia, serif',
            marginTop: '30px',
          }}
        >
          Nos Valeurs
        </h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>Foi :</strong> Centrés sur la Parole de Dieu.
          </li>
          <li>
            <strong>Excellence :</strong> Offrir un contenu de qualité et
            accessible.
          </li>
          <li>
            <strong>Communion :</strong> Créer un pont entre l'église et les
            croyants.
          </li>
        </ul>
      </div>
    </div>
  );
}
