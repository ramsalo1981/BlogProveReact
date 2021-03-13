import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import img1 from "../Images/image1.jpg"
import img2 from "../Images/image2.jpg"


function Cards() {
  return (
    <div className='cards'>
      <h1 className="cards__Title">Check out Your Catalogues!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={img2}
              text='Lorem Ipsum is simply dummy text of the printing and typesetting industry'
              label='Categories'
              path='/categories'
            />
            <CardItem
              src={img1}
              text='Lorem Ipsum is simply dummy text of the printing and typesetting industry'
              label='Posts'
              path='/posts'
            />
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;