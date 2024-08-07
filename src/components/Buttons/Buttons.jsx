import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Buttons.scss'

const APP_TOKEN = 'd28721be-fd2d-4b45-869e-9f253b554e50';
const PROMO_ID = '43e35910-c168-4634-ad4f-52fd764a843f';

function Buttons(props) {


  const [isPressed, setIsPressed] = useState(false)


  const generateKey = (APP_TOKEN, PROMO_ID) => {

   // Generation of a random client id which is 19 integers
    const generateClientId = () => {
      const timestamp = Date.now();
      const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
      console.log(randomNumbers);
      return `${timestamp}-${randomNumbers}`;
    };

    //  Trying to get bearer token of this random client id
    const getClientToken = async () => {
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
          console.log('Error clientToken', clientToken);
          setIsPressed(false);
          props.setInfo('Error. Something went wrong');

        } else {
          console.log('clientToken', clientToken);
          registerEvent(clientToken);
        }
      })
      .catch((err) => {
        console.log(`не удалось создать clientToken. Ошибка: ${err}`);
        setIsPressed(false);
        props.setInfo('Error. Something went wrong');
      });
    };

    const registerEvent = async (token) => {
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
        setIsPressed(false);
        props.setInfo('Error. Something went wrong');
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
        props.setKeys(k => [...k, promoCode])
        setIsPressed(false);
        props.setInfo('Key generation might take up to 3 minutes');
      })
      .catch((err) => {
        console.log(`не удалось сгенерировать ключ. Ошибка: ${err}`);
        setIsPressed(false);
        props.setInfo('Error. Something went wrong');
      });
    };

    const start = () => {
      getClientToken();
    };

    start();
  };

// BAG After key is generated loading text still be owrking FIX LATER
// let dots = '';
// const loadingText = (text) => {
//   setInterval(() => {
//     dots += '.';
//     setInfo(text + dots)

//     if (dots.length === 3) {
//       dots = '';
//     }
//   }, 1000);
// }

const handleOneKey = () => {
  setIsPressed(true);
  if (props.keys.length > 3) {
    props.setKeys([]);
  }
  props.setInfo('Key is generating...');
  generateKey(APP_TOKEN, PROMO_ID, props.setKeys, props.keys);
};

  const handleFourKey = () => {
    setIsPressed(true)
    if(props.keys){props.setKeys([])}
    props.setInfo('Key is generating...')
    for (let index = 0; index < 4; index++) {
      generateKey(APP_TOKEN, PROMO_ID, props.setKeys, props.keys);
    }
  }

  return (
    <div className='buttons'>
        <button id='1' className={'get-key-button one-key ' + (isPressed ? 'disabled' : '')} onClick={handleOneKey} >Get 1 key</button>
        <button id='4' className={'get-key-button four-keys ' + (isPressed ? 'disabled' : '')} onClick={handleFourKey} >Get 4 keys</button>
    </div>
  )
}

export default Buttons
