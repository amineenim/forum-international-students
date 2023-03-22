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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam urna ac dolor suscipit, eu vestibulum nisl tristique. Quisque mollis sapien eu mauris luctus, et bibendum enim bibendum. Donec sed ante ante. </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam urna ac dolor suscipit, eu vestibulum nisl tristique. Quisque mollis sapien eu mauris luctus, et bibendum enim bibendum. Donec sed ante ante. </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam urna ac dolor suscipit, eu vestibulum nisl tristique. Quisque mollis sapien eu mauris luctus, et bibendum enim bibendum. Donec sed ante ante. </p>
        <div style={{ marginTop : 30}}>
          <button style={{ borderRadius: '50px', backgroundColor: 'brown', padding: '10px 20px', color: 'white' }}>Témoignages</button>
        </div>
      </div>
    </div>
  );
};

export default ImageAndText;





