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
      APP_TOKEN: '82647f43-3f87-402d-88dd-09a90025313f',
      PROMO_ID: 'c4480ac7-e178-4973-8061-9ed5b2e17954'
    },
    'my-clone-game': {
      APP_TOKEN: '74ee0b5b-775e-4bee-974f-63e7f4d5bacb',
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
