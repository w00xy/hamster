import { useState } from 'react'
import Keys from '../../components/Keys/Keys'
import Buttons from '../../components/Buttons/Buttons'
import './EventKey.scss'

function Eventkey() {
  const [info, setInfo] = useState('Key generation might take up to 3 minutes');
  const [keys, setKeys] = useState([])

  return (
    <div className='eventkey'>
      <h1 className='capital'>Click the button to get key 👇</h1>
      <Keys keys={keys} setKeys={setKeys}/>
      <div className='info'>{info}</div>
      <Buttons keys={keys} setKeys={setKeys} info={info} setInfo={setInfo}/>

    </div>
  )
}

export default Eventkey
