import React from 'react';
import exampleImage from '../assets/students-globe.jpg';

const ImageAndText = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginTop : 30 }}>
        <img src={exampleImage} alt="Library" style={{ maxWidth: '70%', marginLeft: 50 }} />
      </div>
      <div style={{ flex: 1, marginRight: 50 }}>
        <h2>A PROPOS</h2>
        <p>Bienvenue sur Together, un site dédié aux étudiants étrangers qui cherchent à se connecter et à s'entraider. Nous sommes ravis que vous soyez ici et nous espérons que notre plateforme sera utile pour faciliter votre intégration dans votre nouvelle communauté universitaire. </p>
        <p>Notre objectif est de créer un espace où les étudiants étrangers peuvent échanger des conseils, des informations pratiques, des expériences et des histoires. Nous sommes convaincus que cela peut aider à briser les barrières culturelles et linguistiques qui peuvent parfois rendre l'expérience de l'étude à l'étranger difficile. </p>
        <p>Nous sommes une équipe de passionnés qui croient en la valeur de la diversité et de l'inclusion dans l'éducation. Nous sommes constamment à la recherche de moyens d'améliorer notre plateforme pour mieux répondre aux besoins des étudiants étrangers. </p>
        <p>Nous espérons que vous trouverez Together utile et que vous vous joindrez à notre communauté. Si vous avez des commentaires ou des suggestions, n'hésitez pas<a href='#'> à nous contacter</a>. Nous sommes là pour vous aider à vous connecter, à vous sentir chez vous et à réussir dans vos études à l'étranger.</p>
        <div style={{ marginTop : 30}}>
          <button style={{ borderRadius: '50px', backgroundColor: 'brown', padding: '10px 20px', color: 'white' }}>Témoignages</button>
        </div>
      </div>
    </div>
  );
};

export default ImageAndText;





