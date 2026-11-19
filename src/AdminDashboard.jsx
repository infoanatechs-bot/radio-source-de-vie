import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [programmes, setProgrammes] = useState([]);
  
  // Formulaire
  const [titre, setTitre] = useState('');
  const [jour, setJour] = useState('Dimanche');
  const [debut, setDebut] = useState('09:00');
  const [fin, setFin] = useState('11:00');
  const [animateur, setAnimateur] = useState('');
  const [type, setType] = useState('Culte');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
      else {
        setSession(session);
        chargerProgrammes();
      }
      setChargement(false);
    });
  }, [navigate]);

  const chargerProgrammes = async () => {
    const { data } = await supabase.from('programs').select('*').order('id', { ascending: false });
    if (data) setProgrammes(data);
  };

  const ajouterProgramme = async (e) => {
    e.preventDefault();
    setEnvoiEnCours(true);

    const { error } = await supabase.from('programs').insert([
      { title: titre, day_of_week: jour, start_time: debut, end_time: fin, animator: animateur, type: type }
    ]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      setTitre(''); setAnimateur('');
      chargerProgrammes();
    }
    setEnvoiEnCours(false);
  };

  const gererDeconnexion = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (chargement) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Chargement...</p>;

  return (
    // FOND GRIS CLAIR RÉTABLI ICI
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#F5F6F8', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', color: '#0B1F4B', fontSize: '36px', margin: 0 }}>
          Tableau de bord
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/admin/predications" style={{ backgroundColor: '#0B1F4B', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Gérer les audios
          </Link>
          <button onClick={gererDeconnexion} style={{ backgroundColor: '#B3261E', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Formulaire avec fond blanc et ombre */}
        <div style={{ flex: 1, minWidth: '300px', backgroundColor: 'white', padding: '30px', borderRadius: '18px', boxShadow: '0 4px 20px rgba(11,31,75,0.08)' }}>
          <h2 style={{ color: '#0B1F4B', marginTop: 0, fontSize: '20px' }}>Ajouter un programme</h2>
          <form onSubmit={ajouterProgramme} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Titre</label>
              <input required type="text" value={titre} onChange={e => setTitre(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Jour</label>
                <select value={jour} onChange={e => setJour(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Type</label>
                <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                  {['Culte', 'Prière', 'Enseignement', 'Louange'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Début</label>
                <input required type="time" value={debut} onChange={e => setDebut(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Fin</label>
                <input required type="time" value={fin} onChange={e => setFin(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Animateur</label>
              <input required type="text" value={animateur} onChange={e => setAnimateur(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>

            <button disabled={envoiEnCours} type="submit" style={{ backgroundColor: '#C9A227', color: '#0B1F4B', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              {envoiEnCours ? 'Ajout...' : 'Ajouter'}
            </button>
          </form>
        </div>

        {/* Liste avec fond blanc et ombre */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ color: '#0B1F4B', marginTop: 0, fontSize: '20px' }}>Programmes enregistrés</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {programmes.map(prog => (
              <div key={prog.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '4px solid #0B1F4B' }}>
                <strong style={{ color: '#0B1F4B' }}>{prog.title}</strong>
                <div style={{ fontSize: '13px', color: '#3A4256', marginTop: '5px' }}>
                  {prog.day_of_week} • {prog.animator}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}