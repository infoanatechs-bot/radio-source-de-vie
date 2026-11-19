      {/* BANNIÈRE BLEUE */}
      <div style={{ backgroundColor: '#0B1F4B', padding: '40px 20px', marginBottom: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#C9A227', fontSize: '32px', margin: 0 }}>
            Tableau de bord
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/admin/predications" style={{ backgroundColor: '#C9A227', color: '#0B1F4B', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Gérer les audios
            </Link>
            <button onClick={gererDeconnexion} style={{ backgroundColor: '#B3261E', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* LE RESTE DE TON CODE (le formulaire et la liste) va en dessous, dans une div maxWidth: 1000px */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
         {/* ... ton formulaire existant ... */}
      </div>