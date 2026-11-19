import React, { useState } from 'react';

export default function LiveNow() {
  const [isPlaying, setIsPlaying] = useState(false);
  // URL d'un flux de test (une radio chrétienne publique gratuite)
  const testStreamUrl = 'https://stream.radiojar.com/8s5u5tpdtwzuv';

  const togglePlay = () => {
    const audio = document.getElementById('live-audio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}
    >
      <h2
        style={{
          fontFamily: 'Georgia, serif',
          color: '#0B1F4B',
          fontSize: '28px',
          marginBottom: '20px',
        }}
      >
        À l'antenne
      </h2>

      <div
        style={{
          display: 'flex',
          backgroundColor: 'white',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(11,31,75,0.08)',
        }}
      >
        <div
          style={{
            width: '40%',
            backgroundColor: '#142A5C',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <span style={{ color: 'white', opacity: 0.5 }}>
            [Image de l'émission]
          </span>
        </div>

        <div
          style={{
            padding: '30px',
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              backgroundColor: '#B3261E',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              width: 'max-content',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'white',
                borderRadius: '50%',
              }}
            ></span>
            EN DIRECT
          </span>

          <h3
            style={{ margin: '0 0 10px 0', color: '#0B1F4B', fontSize: '24px' }}
          >
            Culte Dominical (Test)
          </h3>
          <p
            style={{ margin: '0 0 20px 0', color: '#3A4256', fontSize: '16px' }}
          >
            Pasteur Jean Dupont
          </p>

          {/* Balise audio cachée qui fait le vrai travail */}
          <audio id="live-audio" src={testStreamUrl} preload="none" />

          <button
            onClick={togglePlay}
            style={{
              backgroundColor: isPlaying ? '#B3261E' : '#0B1F4B',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: 'max-content',
            }}
          >
            {isPlaying ? '⏸ Arrêter le direct' : '▶ Écouter maintenant'}
          </button>
        </div>
      </div>
    </section>
  );
}
