import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Buttons.scss';
import { useAdsgram } from "../../utils/Adds/useAdsgram";

let progress = 0;

function Buttons(props) {

  const [isPressed, setIsPressed] = useState(false)

  const generateKey = (APP_TOKEN, PROMO_ID, DELAY) => {

   // Generation of a random client id which is 19 integers
    const generateClientId = () => {
      progress += 10
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
      }, DELAY);
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
        progress = 100;
        props.setTempKeys(k => [...k, promoCode])
        setIsPressed(false);
        props.setInfo('Key generation might take up to 3 minutes');
      })
      .catch((err) => {
        console.log(`не удалось сгенерировать ключ. Ошибка: ${err}`);
        setIsPressed(false);
        progress = 0
        props.setInfo('Error. Something went wrong');
      });
    };

    const start = () => {
      progress = 0;
      getClientToken();
    };

    start();
  };

  const handleOneKey = () => {
    setIsPressed(true);
    if (props.tempKeys.length > 3) {
      props.setInfo('Watch the ad and get generated keys')
    } else {
      props.setTempKeys([]);
      props.setInfo('Key is generating...');
      generateKey(props.APP_TOKEN, props.PROMO_ID, props.DELAY);
    }
  };
  
  const onReward = useCallback(() => {
    // setKeys(...k + props.tempKeys)
    console.log('cool')
  }, []);
  const onError = useCallback((result) => {
    // props.setInfo('Watch the ad till the end to get keys');
    console.log('fuck')
  }, []);

  const showAd = useAdsgram({ blockId: "2152", onReward, onError });

  const showAd1 = () => {
    handleOneKey()
    showAd
  }

  const handleFourKey = () => {
    setIsPressed(true)
    props.setInfo('Keys are generating...');
    if(props.tempKeys){props.setTempKeys([])}
    for (let index = 0; index < 4; index++) {
      generateKey(props.APP_TOKEN, props.PROMO_ID, props.DELAY);
    }
  }

  return (
    <div className='buttons'>
        <button id='1' className={'get-key-button one-key ' + (isPressed ? 'disabled' : '')} onClick={showAd1} >Get 1 key</button>
        <button id='4' className={'get-key-button four-keys ' + (isPressed ? 'disabled' : '')} onClick={handleFourKey} >Get 4 keys</button>
    </div>
  )
}

export default Buttons
