import React, { useEffect, useState } from 'react';

export default function InstallButton() {
  const [promptInstall, setPromptInstall] = useState(null);
  const [ferme, setFerme] = useState(false);
  const [dejaInstalle, setDejaInstalle] = useState(false);

  const estIPhone =
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    const dejaOuvertEnApp =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (dejaOuvertEnApp) setDejaInstalle(true);

    const avantInstallation = (e) => {
      e.preventDefault();
      setPromptInstall(e);
    };
    const apresInstallation = () => {
      setDejaInstalle(true);
      setPromptInstall(null);
    };

    window.addEventListener('beforeinstallprompt', avantInstallation);
    window.addEventListener('appinstalled', apresInstallation);
    return () => {
      window.removeEventListener('beforeinstallprompt', avantInstallation);
      window.removeEventListener('appinstalled', apresInstallation);
    };
  }, []);

  const installer = async () => {
    if (!promptInstall) return;
    promptInstall.prompt();
    await promptInstall.userChoice;
    setPromptInstall(null);
  };

  if (dejaInstalle || ferme) return null;
  if (!promptInstall && !estIPhone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: '12px',
        right: '12px',
        bottom: '12px',
        zIndex: 1000,
        backgroundColor: '#0B1F4B',
        color: 'white',
        borderRadius: '16px',
        padding: '14px 16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <img
        src="/icon-192.png"
        alt=""
        style={{ width: '44px', height: '44px', borderRadius: '10px' }}
      />
      <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.4 }}>
        <strong style={{ display: 'block', fontSize: '15px' }}>
          Source de Vie
        </strong>
        {promptInstall
          ? 'Installez l\u2019application pour écouter la radio en un clic.'
          : 'Sur iPhone : touchez Partager, puis \u00ab Sur l\u2019écran d\u2019accueil \u00bb.'}
      </div>
      {promptInstall && (
        <button
          onClick={installer}
          style={{
            backgroundColor: '#C9A227',
            color: '#0B1F4B',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Installer l'application
        </button>
      )}
      <button
        onClick={() => setFerme(true)}
        aria-label="Fermer"
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          opacity: 0.7,
        }}
      >
        ✕
      </button>
    </div>
  );
}