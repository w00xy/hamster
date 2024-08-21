import React from 'react'
import './Menu.scss'
import { Link } from "react-router-dom";
import { promoList } from "../../utils/promoList";

const games = Object.keys(promoList);

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function Menu() {
  return (
    <div className="menu">
      <h1 className='main-text'>Select the game</h1>
      <div className='cards'>
      {games.map((el, index) => (
        <Link key={index} className='select-game' to={el}>
          <img src={el + '.jpg'} alt={el} />
          <p>{el.capitalizeFirstLetter()}</p>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default Menu
