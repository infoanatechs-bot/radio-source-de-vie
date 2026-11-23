import React, { useEffect, useRef } from 'react';

export default function LiveNow() {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container) return;

    container.innerHTML = `
      <div
        data-type="newStreamPlayer"
        data-publicToken="f5ea614a-0bea-418d-870d-b5b20fed3ec2"
        data-theme="light"
        data-color="e81e4d"
        data-channelId="a3441219-9dfa-49c4-80cf-9ef521e27832"
        data-rendered="false"
        class="cstrEmbed"
      >
        <a href="https://www.caster.fm">Shoutcast Hosting</a>
        <a href="https://www.caster.fm">Stream Hosting</a>
        <a href="https://www.caster.fm">Radio Server Hosting</a>
      </div>
    `;

    const script = document.createElement('script');
    script.src = 'https://cdn.cloud.caster.fm//widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <section
      id="direct"
      style={{
        padding: '60px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        scrollMarginTop: '80px',
      }}
    >
      <h2 style={{ fontFamily: 'Georgia, serif', color: '#0B1F4B', fontSize: '28px', marginBottom: '20px' }}>
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
          <span style={{ color: 'white', opacity: 0.5 }}>[Image de l'émission]</span>
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
                animation: 'pulse 1.5s infinite',
              }}
            ></span>
            EN DIRECT
          </span>

          <h3 style={{ margin: '0 0 10px 0', color: '#0B1F4B', fontSize: '24px' }}>
            Source de Vie Direct
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#3A4256', fontSize: '16px' }}>
            Diffusé depuis Caster.fm
          </p>

          <div ref={widgetContainerRef} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}