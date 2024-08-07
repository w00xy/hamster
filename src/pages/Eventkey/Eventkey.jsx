import { useState, useEffect } from 'react'
import Keys from '../../components/Keys/Keys'
import Buttons from '../../components/Buttons/Buttons'
import './EventKey.scss'
import { useParams, useNavigate, Link } from "react-router-dom";

function Eventkey() {
  const [info, setInfo] = useState('Key generation might take up to 3 minutes');
  const [keys, setKeys] = useState([])
  const gameName = {
    'bike-game': {
      APP_TOKEN: 'd28721be-fd2d-4b45-869e-9f253b554e50',
      PROMO_ID: '43e35910-c168-4634-ad4f-52fd764a843f'
    },
    'chain-game': {
      APP_TOKEN: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
      PROMO_ID: 'b4170868-cef0-424f-8eb9-be0622e8e8e3'
    },
    'train-game': {
      APP_TOKEN: 'd28721be-fd2d-4b45-869e-9f253b554e50',
      PROMO_ID: '43e35910-c168-4634-ad4f-52fd764a843f'
    },
    'my-clone-game': {
      APP_TOKEN: '01e4cff9-898a-4819-859b-f70f3a6bbd3e',
      PROMO_ID: 'fe693b26-b342-4159-8808-15e3ff7f8767'
    }
  }

  const { gameId }= useParams()

  const navigate = useNavigate(); // Получаем функцию для редиректа
  const allowedGameIds = ['bike-game', 'chain-game', 'train-game', 'my-clone-game'];

  // ... ваш код для Keys, Buttons и т.д. ...

  useEffect(() => {
    if (!allowedGameIds.includes(gameId)) {
      navigate('/404');
    }
  }, [gameId]);
  const APP_TOKEN = gameName[gameId].APP_TOKEN
  const PROMO_ID = gameName[gameId].PROMO_ID

  return (
    <div className='eventkey'>
      <h1 className='capital'>{gameId.toUpperCase()}</h1>
      <div className='back-to-home'>
        <Link className='' to='/'>Menu</Link>
      </div>
      <Keys keys={keys} setKeys={setKeys}/>
      <div className='info'>{info}</div>
      <Buttons keys={keys} setKeys={setKeys} info={info} setInfo={setInfo} APP_TOKEN={APP_TOKEN} PROMO_ID={PROMO_ID}/>

    </div>
  )
}

export default Eventkey
