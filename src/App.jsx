import { useRef, useState } from 'react';
import './reset.css';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';


function App() {

const [info, setInfo] = useState('Key generation might take up to 3 minutes')
const [keys, setKeys] = useState([])
const [isPressed, setIsPressed] = useState(false)
const [isPressedCopy, setIsPressedCopy] = useState({
  0: false,
  1: false,
  2: false,
  3: false,

})


const generateKey = (count) => {
 const APP_TOKEN = 'd28721be-fd2d-4b45-869e-9f253b554e50';
 const PROMO_ID = '43e35910-c168-4634-ad4f-52fd764a843f';

// Generation of a random client id which is 19 integers
 const generateClientId = () => {
  const timestamp = Date.now();
  const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
  console.log(randomNumbers);
  return `${timestamp}-${randomNumbers}`;
 };

//  Trying to get bearer token of this random client id
 const getClientToken = async () => {
  // setInfo('Client token generating')
  // loadingText('Client token generating')

  const id = generateClientId();
  const body = {
   appToken: APP_TOKEN,
   clientId: id,
   clientOrigin: 'deviceid',
  };

  await fetch('https://api.gamepromo.io/promo/login-client', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(body),
  })
   .then((res) => res.json())
   .then(({ clientToken }) => {
    if(typeof(clientToken) === undefined || !clientToken || typeof(clientToken) === null){
      console.log('clientToken', clientToken);
      getClientToken()
    } else {
      console.log('clientToken', clientToken);
      registerEvent(clientToken);

    }
   })
   .catch((err) => {
     console.log(`не удалось создать clientToken. Ошибка: ${err}`);
     getClientToken()
   });
 };

 const registerEvent = async (token) => {
  // setInfo('Key generating')
  loadingText('Key generating')
  const body = {
   promoId: PROMO_ID,
   eventId: uuidv4(),
   eventOrigin: 'undefined',
  };

  console.log('EVENT', token);
  const codeInterval = setInterval(async () => {
   await fetch('https://api.gamepromo.io/promo/register-event', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
   })
    .then((res) => res.json())
    .then(({ hasCode }) => {
     console.log(`hasCode: ${hasCode}`);
     if (hasCode) {
      generateKey(token);
      clearInterval(codeInterval);
     }
    })
    .catch((err) => {
     console.log(`не удалось зарегистрировать событие. Ошибка: ${err}`);
    //  setInfo('ERROR Try again')
     loadingText('ERROR Try again')
     setIsPressed(false)
    });
  }, 25000);
 };

//  Generation of the key
 const generateKey = async (token) => {
  const body = {
   promoId: PROMO_ID,
  };

  await fetch('https://api.gamepromo.io/promo/create-code', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify(body),
  })
   .then((res) => res.json())
   .then(({ promoCode }) => {
    if (count) {
     setTimeout(() => start(), 2000);
    // setInfo(`${count} Keys left`)
    loadingText(`${count} Keys left`)
    } else {
    setKeys(k => [...k, promoCode])
    setIsPressed(false)
    }
    setInfo('Key generation might take up to 3 minutes')
   })
   .catch((err) => {
    console.log(`не удалось сгенерировать ключ. Ошибка: ${err}`);
   });
 };

 const start = () => {
  if (count) count--;
  setIsPressed(true)
  if(keys.length === 4){setKeys([])}
  getClientToken();
 };

 start();
};

const handleFourKey = (el) => {
  setIsPressed(true)
  if(keys){setKeys([])}
  for (let index = 0; index < 5; index++) {
    generateKey()
  }
}


let dots = '';
const loadingText = (text) => {
  setInterval(() => {
    dots += '.';
    setInfo(text + dots)

    if (dots.length === 3) {
      dots = '';
    }
  }, 1000);
}

const handleCopy = (index) => {
  navigator.clipboard.writeText(keys[index])
  let pressed = {...isPressedCopy}
  pressed[index] = true
  setIsPressedCopy(pressed)
  setTimeout(() => {
    pressed = {...isPressedCopy}
    for (let index = 0; index < 4; index++) {
      pressed[index] = false
    }
    setIsPressedCopy(pressed)
  }, 1200);
};

  return (
    <div className='main'>
      <h1 className='capital'>Click the button to get key 👇</h1>
      <ul className='keys' >
        {keys.map((el, index) => (
          <li className='key' key={index}>{el} <img onClick={() => handleCopy(index)} key={index} src={(isPressedCopy[index] ? 'copied.png' : 'copy.png')} alt='copy'/></li>
        ))}
      </ul>
      <div className='info'>{info}</div>
      <div className='buttons'>
        <button id='1' className={'get-key-button one-key ' + (isPressed ? 'disabled' : '')} onClick={generateKey} >Get 1 key</button>
        <button id='4' className={'get-key-button four-keys ' + (isPressed ? 'disabled' : '')} onClick={handleFourKey} >Get 4 keys</button>
      </div>
    </div>
  )
}

export default App
