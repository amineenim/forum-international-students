import React, { useState } from 'react';
import UniversityImage from '../assets/bg-university.avif';

function NouveauPoste() {
  const [category, setCategory] = useState('');
  const [titre, setTitre] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code pour poster le contenu
  };

  return (
    <div className="nouveau-poste" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundImage: `url(${UniversityImage})` }}>
      <h1>Nouveau poste</h1>
      <form onSubmit={handleSubmit} style={{ width:'80%' }}>
      <label htmlFor="category">Catégorie*:</label>
      <select value={category} id="category" onChange={(event) => setCategory(event.target.value)} style={{ width: '80%', height: '40px', borderRadius:'50px'}}>
        <option value="">Sélectionner une categorie</option>
        <option value="category1">category 1</option>
        <option value="category2">category 2</option>
        <option value="category3">category 3</option>
      </select> 
        <label htmlFor="titre">Titre*</label>
        <input type="text" id="titre" placeholder='Titre du poste' value={titre} onChange={(event) => setTitre(event.target.value)} style={{ width: '78%', borderRadius:'0px' }} />
        <label htmlFor="post">Texte*</label>
        <textarea id="post" value={post} rows = "5" placeholder='Développez votre besoin ...' onChange={(event) => setPost(event.target.value)} style={{ width: '79%' }}></textarea>
        <button type="submit" style={{ backgroundColor: 'brown', height: 30, width: 100, marginTop:10, borderRadius:'50px' }}>Poster</button>
      </form>
    </div>
  );
}

export default NouveauPoste;
