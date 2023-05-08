import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import '../Styles/Main.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
    },

  },
});

export default function ConatctBody() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(event.target.value.trim() === '');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(event.target.value.trim() === '');
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageError(event.target.value.trim() === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      setNameError(true);

    }
    if (email.trim() === '') {
      setEmailError(true);

    }
    if (message.trim() === '') {
      setMessageError(true);
      return;
    }
  };

  return (
    <div className='container-bg w-full'>
      <Helmet>
        <title>TOGETHER | Contact</title>
      </Helmet>
      <div className='pt-[4%] pb-[2%] px-[7%]'>
        <div className='w-full flex items-center justify-center text-center text-4xl text-black font-bold'>
          <span>Contactez nous </span>
        </div>
        <div className='mt-[2%] justify-center text-center text-xl'>
          <p>
          Bienvenue sur notre page de contact ! Nous sommes ravis que vous ayez pris le temps de nous rendre visite. 
          Si vous avez des questions, des commentaires ou des préoccupations, n'hésitez pas à nous contacter. 
          Nous sommes là pour vous aider.
          </p>
        </div>
        <div className='grid grid-cols-2 grid-rows-1 gap-10 w-full my-[2%]'>
            <div className=''>
              <input type="text" className="form-control w-full h-10 text-black px-4 rounded-xl py-2 border-2 border-color-sixth" placeholder="Nom" />
            </div>
            <div className=''>
              <input type="email" className="form-control w-full h-10 text-black px-4 rounded-xl py-2 border-2 border-color-sixth" placeholder="Email" />
            </div>
        </div>
        <div className='w-full h-48'>
          <textarea className="form-control w-full h-full text-black px-4 rounded-xl py-2 border-2 border-color-sixth" placeholder="Message" />
        </div>
        <div className='flex items-center justify-center w-full mt-[2%]'>
          <button type="submit" className="bg-[#535353] text-white px-4 py-2 text-2xl font-bold rounded-xl w-36">Envoyer</button>
        </div>
      </div>
    </div >
  );
}