import { useEffect, useState } from 'react'
import './Keys.scss'

function Keys(props) {
  const [isPressedCopy, setIsPressedCopy] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  })

  const handleCopy = (index) => {
    console.log('coppied!')
    navigator.clipboard.writeText(props.keys[index])
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
    <ul className='keys' >
        {props.keys.map((el, index) => (
          <li className='key' key={index}>{el} <img onClick={() => handleCopy(index)} key={index} src={(isPressedCopy[index] ? 'copied.png' : 'copy.png')} alt='copy'/></li>
        ))}

    </ul>
  )
}

export default Keys
