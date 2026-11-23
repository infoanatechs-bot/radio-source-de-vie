import React from 'react';

export default function Hero() {
  const allerAuDirect = () => {
    document.getElementById('direct')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        backgroundColor: '#0B1F4B',
        padding: '100px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          fontFamily: 'Georgia, serif',
          margin: 0,
          color: '#C9A227',
        }}
      >
        Bienvenue sur SOURCE DE VIE
      </h1>
      <p
        style={{
          fontSize: '20px',
          maxWidth: '600px',
          lineHeight: '1.5',
          color: '#F5F6F8',
        }}
      >
        Restez connectés à la parole de Dieu, où que vous soyez.
      </p>
      <button
        onClick={allerAuDirect}
        style={{
          marginTop: '20px',
          backgroundColor: '#C9A227',
          color: '#0B1F4B',
          border: 'none',
          padding: '15px 40px',
          borderRadius: '30px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ÉCOUTER MAINTENANT
      </button>
    </section>
  );
}