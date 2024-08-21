import { useState, useEffect } from 'react'
import Keys from '../../components/Keys/Keys'
import Buttons from '../../components/Buttons/Buttons'
import './EventKey.scss'
import { useParams, useNavigate, Link } from "react-router-dom";
import { promoList } from "../../utils/promoList";

function Eventkey() {
  const [info, setInfo] = useState('Key generation might take up to 3 minutes');
  const [keys, setKeys] = useState([]);
  const [tempKeys, setTempKeys] = useState([]);

  const { gameId }= useParams()

  const navigate = useNavigate(); // Получаем функцию для редиректа
  const allowedGameIds = Object.keys(promoList)

  useEffect(() => {
    if (!allowedGameIds.includes(gameId)) {
      navigate('/404');
    }
  }, [gameId]);

  const APP_TOKEN = promoList[gameId].APP_TOKEN
  const PROMO_ID = promoList[gameId].PROMO_ID
  const DELAY = promoList[gameId].DELAY

  return (
    <div className='eventkey'>
      <h1 className='capital'>{gameId.toUpperCase()}</h1>
      <div className='back-to-home'>
        <Link className='' to='/'>Menu</Link>
      </div>
      <Keys keys={keys} setKeys={setKeys}/>
      <div className='info'>{info}</div>
      <Buttons tempKeys={tempKeys} setTempKeys={setTempKeys} keys={keys} setKeys={setKeys} info={info} setInfo={setInfo} APP_TOKEN={APP_TOKEN} DELAY={DELAY} PROMO_ID={PROMO_ID}/>

    </div>
  )
}

export default Eventkey
