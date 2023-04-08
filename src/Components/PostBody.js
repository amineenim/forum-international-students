import React, { useState } from 'react';
import {useForm, Controller} from 'react-hook-form';
import Select from "react-select";
import UniversityImage from '../assets/bg-university.avif';

let data = [
  { value: 1, label: "categorie 1" },
  { value: 2, label: "categorie 2" },
  { value: 3, label: "categorie 3" }
];

function NouveauPoste() {
  const {register,handleSubmit,formState:{errors}, control}= useForm()
  const onSubmit = (data) => console.log(data)


  return (
    <div style={{  backgroundImage: `url(${UniversityImage})`,  backgroundSize: 'cover', height: '100vh' }}>
      <div style={{backgroundColor: 'rgb(255, 241, 224)', width: '60%'}}>
      <h1 style={{marginLeft: 30}}>Nouveau poste</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems:'initial', width:'100%' }}>
      <label style={{textAlign: 'left', marginBottom:'10px'}} htmlFor="category">Catégorie*:</label>
        <Controller
                name="category"
                render={({ field }) => (
                  <Select
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      width: '95%', height: '40px', borderRadius:'50px', textAlign: 'left'
                    }),
                  }}
                    {...field}
                    options={[{ value: "", label: "Sélectionner une categorie" }, ...data]}
                    defaultValue=""
                    isMulti
                  />
                )}
                control={control}
                rules={{ required: true }}
              />
           {errors.category && errors.category.type === "required" ? (
                <div>
                  <span style={{color: 'red'}}>
                    {"La catégorie est obligatoire"}
                  </span>
                </div>
              ) : null}
        <label htmlFor="titre" style={{textAlign: 'left', marginBottom:'10px', marginTop:'10px'}}>Titre*</label>
        <input type="text" 
        id="titre" 
        placeholder='Titre du poste'
        style={{ width: '92%', borderRadius:'0px', textAlign: 'left' }} 
        className={
          errors.titre ? "form-control error_input" : "form-control"
        }
        {...register("titre", { required: "Le titre du poste est obligatoire" })}
        />
        {errors.titre && (
                <div>
                  <span style={{color: 'red'}}>{errors.titre.message}</span>
                </div>
              )}
        <label htmlFor="post" style={{textAlign: 'left', marginBottom:'10px', marginTop:'10px'}}>Texte*</label>
        <textarea 
        id="post" 
        rows = "5" 
        placeholder='Développez votre besoin ...' 
        style={{ width: '94%', textAlign: 'left' }}
        className={
          errors.post ? "form-control error_input" : "form-control"
        }
        {...register("post", { required: "Le poste est obligatoire" })}>
        </textarea>
        {errors.post && (
                <div>
                  <span style={{color: 'red'}}>{errors.post.message}</span>
                </div>
              )}
        <div style={{textAlign:'left'}}>
        <button type="submit" style={{ backgroundColor: 'gray', height: 30, width: 100, marginTop:10, borderRadius:'50px' }}>poster</button>
        
        </div>
      </form>
      </div>
    </div>
  );
}

export default NouveauPoste;
