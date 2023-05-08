import React from 'react';
import exampleImage from '../assets/students-globe.jpg';
import { Helmet } from 'react-helmet';
import '../Styles/Main.css';
import { Link, useNavigate } from 'react-router-dom';


const ImageAndText = () => {
  return (
    <div style={{ display: 'flex' }} className='pt-[5%] pb-[3%] container-bg'>
      <Helmet>
        <title>TOGETHER | A propos</title>
      </Helmet>
      <div style={{ flex: 1, marginTop : 30 }}>
        <img className='rounded-lg border-2 border-color-secondary border-solid shadow-md drop-shadow-md shadow-black' src={exampleImage} alt="Library" style={{ maxWidth: '70%', marginLeft: 50 }} />
      </div>
      <div style={{ flex: 1, marginRight: 50 }} className='font-semibold text-justify'>
        <h2 className='font-bold text-3xl mb-6'>A PROPOS</h2>
        <p>Bienvenue sur Together, un site dédié aux étudiants étrangers qui cherchent à se connecter et à s'entraider. Nous sommes ravis que vous soyez ici et nous espérons que notre plateforme sera utile pour faciliter votre intégration dans votre nouvelle communauté universitaire. </p>
        <p>Notre objectif est de créer un espace où les étudiants étrangers peuvent échanger des conseils, des informations pratiques, des expériences et des histoires. Nous sommes convaincus que cela peut aider à briser les barrières culturelles et linguistiques qui peuvent parfois rendre l'expérience de l'étude à l'étranger difficile. </p>
        <p className='mt-6'>Nous sommes une équipe de passionnés qui croient en la valeur de la diversité et de l'inclusion dans l'éducation. Nous sommes constamment à la recherche de moyens d'améliorer notre plateforme pour mieux répondre aux besoins des étudiants étrangers. </p>
        <p>Nous espérons que vous trouverez Together utile et que vous vous joindrez à notre communauté. Si vous avez des commentaires ou des suggestions, n'hésitez pas<a href='#'> à nous contacter</a>.</p>
        <div style={{ marginTop : 30}}>
        <Link to='/temoignages'>
            <button  className='uppercase bg-color-secondary bg-color-primary-2-hover color-primary-2 color-secondary-hover border-color-secondary-hover border-2 border-color-secondary px-6 py2 rounded-3xl h-10 underline font-semibold'>
                <span>Témoignages</span>
            </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageAndText;





