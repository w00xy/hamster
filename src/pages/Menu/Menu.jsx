import React from 'react'
import './Menu.scss'
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <h1 className='main-text'>Select the game</h1>
      <div className='cards'>
        <Link className='select-game' to="bike-game">
          <img src="bike-ride-3d.jpg" alt="bike game" />
          <p>Bike Ride 3D</p>
        </Link>
        <Link className='select-game' to="/chain-game">
          <img src="chain-cube-2048.jpg" alt="bike game" />
          <p>Chain Cude 2048</p>
        </Link>
        <Link className='select-game' to="/train-game">
          <img src="train-miner.jpg" alt="bike game" />
          <p>Train Miner</p>
        </Link>
        <Link className='select-game' to="/my-clone-game">
          <img src="my-clone-army.jpg" alt="bike game" />
          <p>My Clone Army</p>
        </Link>
      </div>


    </div>
  )
}

export default Menu
