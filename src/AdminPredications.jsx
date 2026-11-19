import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminPredications() {
  const [session, setSession] = useState(null);
  const [chargement, setChargement] = useState(true); // État de chargement initial
  const [predications, setPredications] = useState([]);

  const [titre, setTitre] = useState('');
  const [predicateur, setPredicateur] = useState('');
  const [categorie, setCategorie] = useState('Enseignement');
  const [fichierAudio, setFichierAudio] = useState(null);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [message, setMessage] = useState({ type: '', texte: '' });

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setSession(session);
        chargerPredications();
      }
      setChargement(false); // On arrête le chargement une fois la session vérifiée
    });
  }, [navigate]);

  const chargerPredications = async () => {
    const { data } = await supabase
      .from('sermons')
      .select('*')
      .order('id', { ascending: false });
    if (data) setPredications(data);
  };

  const ajouterPredication = async (e) => {
    e.preventDefault();
    if (!fichierAudio)
      return alert('Veuillez sélectionner un fichier audio MP3.');

    setEnvoiEnCours(true);
    setMessage({ type: '', texte: '' });

    try {
      const nomFichier = `${Date.now()}-${fichierAudio.name.replace(
        /\s/g,
        '_'
      )}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio')
        .upload(nomFichier, fichierAudio);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('audio')
        .getPublicUrl(nomFichier);

      const { error: dbError } = await supabase.from('sermons').insert([
        {
          title: titre,
          preacher: predicateur,
          category: categorie,
          audio_url: urlData.publicUrl,
          published: true,
        },
      ]);

      if (dbError) throw dbError;

      setMessage({
        type: 'succes',
        texte: 'Prédication ajoutée avec succès !',
      });
      setTitre('');
      setPredicateur('');
      setFichierAudio(null);
      e.target.reset();

      chargerPredications();
    } catch (error) {
      console.error(error);
      setMessage({ type: 'erreur', texte: 'Erreur : ' + error.message });
    } finally {
      setEnvoiEnCours(false);
    }
  };

  // Si on est en train de charger la session, on affiche ceci
  if (chargement) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Vérification de la sécurité...
      </div>
    );
  }

  // Si pas de session (bien qu'on redirige, c'est une sécurité)
  if (!session) {
    return null;
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            color: '#0B1F4B',
            fontSize: '32px',
            margin: 0,
          }}
        >
          Gérer les Prédications
        </h1>
        <Link
          to="/admin"
          style={{
            textDecoration: 'none',
            color: '#0B1F4B',
            fontWeight: 'bold',
            backgroundColor: '#e0e0e0',
            padding: '10px 15px',
            borderRadius: '8px',
          }}
        >
          ← Retour au dashboard
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Formulaire d'ajout */}
        <div
          style={{
            flex: 1,
            minWidth: '300px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '18px',
            boxShadow: '0 4px 20px rgba(11,31,75,0.08)',
          }}
        >
          <h2 style={{ fontSize: '20px', marginTop: 0, color: '#0B1F4B' }}>
            Ajouter un audio
          </h2>

          {message.texte && (
            <div
              style={{
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '8px',
                backgroundColor:
                  message.type === 'succes' ? '#e8f5e9' : '#ffebee',
                color: message.type === 'succes' ? '#1E7A4D' : '#B3261E',
              }}
            >
              {message.texte}
            </div>
          )}

          <form
            onSubmit={ajouterPredication}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Titre
              </label>
              <input
                required
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Prédicateur
              </label>
              <input
                required
                type="text"
                value={predicateur}
                onChange={(e) => setPredicateur(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Catégorie
              </label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              >
                {['Enseignement', 'Prédication', 'Louange', 'Prière'].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Fichier Audio (MP3)
              </label>
              <input
                required
                type="file"
                accept="audio/*"
                onChange={(e) => setFichierAudio(e.target.files[0])}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <button
              disabled={envoiEnCours}
              type="submit"
              style={{
                backgroundColor: '#C9A227',
                color: '#0B1F4B',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: envoiEnCours ? 'not-allowed' : 'pointer',
                marginTop: '10px',
              }}
            >
              {envoiEnCours ? 'Envoi en cours...' : "Enregistrer l'audio"}
            </button>
          </form>
        </div>

        {/* Liste des prédications existantes */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '20px', marginTop: 0, color: '#0B1F4B' }}>
            Audios enregistrés
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {predications.length === 0 ? (
              <p>Aucune prédication pour le moment.</p>
            ) : (
              predications.map((pred) => (
                <div
                  key={pred.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #C9A227',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  }}
                >
                  <strong style={{ color: '#0B1F4B' }}>{pred.title}</strong>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#666',
                      marginTop: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    {pred.preacher} • {pred.category}
                  </div>
                  {pred.audio_url && (
                    <audio
                      controls
                      src={pred.audio_url}
                      style={{ width: '100%', height: '35px' }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
